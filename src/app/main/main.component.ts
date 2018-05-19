import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Globals, ScreenSizeEnum } from '../globals';
import { NewsComponent } from './news/news.component';
import { MatDialog } from '@angular/material';
import { EditComponentsDialogComponent } from '../main/edit-components-dialog/edit-components-dialog.component';

interface CustomComponent {
    name?: string,
    htmlContent?: string,
    scriptContent?: string,
    initFunc?: string,
    destroyFunc?: string,

    shows?: boolean,
    scriptDom?: HTMLElement,

    toAdd?: boolean
}

interface Tab {
    name: string,
    components: Array<CustomComponent>
}

@Component({
    selector: 'main-component',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterContentChecked {

    predefinedComponents = [
        '<app-news></app-news>', '<app-weather></app-weather>',
        '<app-stickers></app-stickers>', '<app-features></app-features>'
    ];

    customComponentsPossibleArgs = [
        'name', 'htmlContent', 'scriptContent',
        'initFunc', 'destroyFunc'
    ];
    customComponents: Array<CustomComponent> = [/*{
        name: 'myComp1',
        htmlContent: `
            <div id="customDiv" class="customClass" onshow="window.customComponent1();">asdf</div>
            <style>.customClass { color: red; }</style>
        `,
        scriptContent: `
            <script>
                var interval;

                function customComponent1() {
                    interval = setInterval(() => { document.getElementById('customDiv').innerHTML = (new Date()).toString(); }, 1000);
                }

                function customComponent1Destroy() {
                    clearInterval(interval);
                }
            </script>
        `,
        initFunc: 'customComponent1',
        needsToBeInitedEveryTime: true,
        destroyFunc: 'customComponent1Destroy'
    }*/];
    // How to parse imported files
    fileRegExp: RegExp = /([\s\S]*?)<!-- *SCRIPT +HERE *-->[\s\S]*?<!--([\s\S]*?)-->([\s\S]*)/;
    tabs: Array<Tab> = [];

    screenType = ScreenSizeEnum;
    
    constructor(private globals: Globals, private dialog: MatDialog) { }

    ngOnInit() {
        // TODO: Создать 'edit-components-dialog', отправлять в него this.customComponents
        // и fileRegExp (вынести из parseCustomComponent в переменную).
        // Внутри проверять на regExp и помечать добавленные компоненты флагом toAdd.
        // Отправлять полученный массив назад, проходить по нему.
        // На места toAdd вставлять спаршенные компоненты

        this.globals.screenSizeObservable.subscribe((newScreenSize: ScreenSizeEnum) => {
            this.recreateTabs();
        });

        // Edit components button event from header
        this.globals.editComponentsButtonObservable.subscribe(() => {
            this.editComponentsGUI();
        });

        // Initialize with default if no components saved
        var customComponents = localStorage.getItem('customComponents');
        if (customComponents)
            this.customComponents = JSON.parse(customComponents);
        if (!this.customComponents || this.customComponents.length == 0) {
            this.customComponents = JSON.parse(JSON.stringify(this.globals.predefinedComponents));

            localStorage.setItem('customComponents', JSON.stringify(this.customComponents));
        }

        this.recreateTabs();

        // Run custom components scripts
        this.customComponents.forEach((one) => {
            this.initCustomComponentScript(one);
        });
    }

    ngAfterContentChecked() {
        // Call init functions of components if needed
        this.customComponents.forEach((one, i) => {

            if (one.initFunc) {
                if (
                    document.getElementById('customComponent' + i)
                    && !this.customComponents[i].shows
                ) {
                    window[one.initFunc]();
                    this.customComponents[i].shows = true;
                } else if (
                    one.destroyFunc
                    && !document.getElementById('customComponent' + i)
                    && this.customComponents[i].shows
                ) {
                    this.customComponents[i].shows = false;
                    window[one.destroyFunc]();
                }
            }

        });
    }


    // (Re)Creating a tabs variable
    recreateTabs() {
        // TODO: create tabs
        var tabsCount = Math.ceil(this.customComponents.length / this.globals.componentsPerTab);
        var perTab = this.globals.componentsPerTab;
        var tabs = [];

        for (let i = 0; i < tabsCount; i++) {
            tabs.push({
                name: 'Tab' + (i + 1),
                components: this.customComponents.slice(perTab * i, perTab * (i + 1))
            });
        }

        this.tabs = tabs;
    }

    initCustomComponentScript(one: CustomComponent) {
        if (!one.scriptContent)
            return;

        var span = document.createElement('span');
        span.innerHTML = one.scriptContent;
        document.body.appendChild(span);
        var tags = span.getElementsByTagName('script');
        var scriptText = tags[0] ? tags[0].innerHTML : '';
        document.body.removeChild(span);

        if (scriptText) {
            var script = document.createElement('script');
            script.innerHTML = scriptText;
            document.body.appendChild(script);
        }

        one.scriptDom = script;
    }

    parseCustomComponent(file: string): CustomComponent {
        // TODO: parse custom component from a file and push it to customComponents
        // Regexp to parse given file
        // /([\s\S]*?)<!-- SCRIPT HERE -->[\s\S]*?<!--([\s\S]*?)-->([\s\S]*)/
        // [1] is html, [2] is agrs (need to parse below), [3] is script
        // Parsing [2] with
        // /^(.+?)=(?:"|')?(.+?)(?:"|')?$/

        // To test
        /*var file = `
            asdafjkasdas
            faslk;dka
            f3wjal'fjka

            <!-- SCRIPT HERE -->asdfas
            <!-- initFunc="asdf" -->
            asdaflasjd2 
            ar2olja'2j 

            <!-- COMMENTARY -->
        `;*/

        var matches = file.match(this.fileRegExp);
        // File is not right
        if (!matches[0])
            return;

        var obj: CustomComponent = {};
        obj.htmlContent = matches[1];
        obj.scriptContent = matches[3];

        var argsString = matches[2];
        var args = argsString.split(' ').filter((str) => { return !!str });
        args.forEach((str) => {
            var matches = str.match(/^(.+?)=(?:"|')?(.+?)(?:"|')?$/);
            if (matches && this.customComponentsPossibleArgs.indexOf(matches[1]) > -1) {
                obj[matches[1]] = matches[2];
            }
        });

        return obj;
    }

    deleteCustomComponent(index: number) {
        document.body.removeChild(this.customComponents[index].scriptDom);
        this.customComponents.splice(index, 1);
    }

    editComponentsGUI() {
        var dialogRef = this.dialog.open(EditComponentsDialogComponent, {
            width: '350px',
            data: {
                components: JSON.parse(JSON.stringify(this.customComponents)),
                fileRegExp: this.fileRegExp
            }
        });

        dialogRef.afterClosed().subscribe((data: Array<CustomComponent>) => {
            if (!data) {
                return;
            }

            // Replace components with 'toAdd' with their parsed version
            data.map((one, i) => {
                if (!one.toAdd)
                    return one;

                var obj = this.parseCustomComponent(one.htmlContent);
                data[i] = obj;
                this.initCustomComponentScript(obj);
            });

            this.customComponents = data;
            this.recreateTabs();

            localStorage.setItem('customComponents', JSON.stringify(this.customComponents));
        });
    }

}
