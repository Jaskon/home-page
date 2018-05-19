import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum ScreenSizeEnum {
    Mobile,
    Tablet,
    Desktop
}

@Injectable()
export class Globals {
    screenSize: ScreenSizeEnum = ScreenSizeEnum.Desktop;
    screenSizeObservable: Subject<ScreenSizeEnum> = new Subject();
    // Number of components per tab (changing on screenSize change)
    componentsPerTab: number = 4;
    // Button in header component
    editComponentsButtonObservable: Subject<any> = new Subject();
    // List of all predefined components
    predefinedComponents = [
        { name: 'News', htmlContent: '<app-news></app-news>' },
        { name: 'Weather', htmlContent: '<app-weather></app-weather>' },
        { name: 'Stickers', htmlContent: '<app-stickers></app-stickers>' },
        { name: 'Notifications', htmlContent: '<app-features></app-features>' }
    ];
}
