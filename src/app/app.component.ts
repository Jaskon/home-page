import { Component, OnInit, HostListener } from '@angular/core';
import { Globals, ScreenSizeEnum } from './globals';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'HomePage';
  prevScreenSize = null;

  constructor(private globals: Globals) { }

  ngOnInit() {
    this.onResize();
  }

  @HostListener('window:resize', [])
  onResize() {
    let size = window.innerWidth;

    // Screen sizes switch
    switch (true) {

      // Mobile
      case (size <= 400):
        this.globals.screenSize = ScreenSizeEnum.Mobile;
        this.globals.componentsPerTab = 1;
        break;

      // Tablet
      case (size > 400 && size <= 800):
        this.globals.screenSize = ScreenSizeEnum.Tablet;
        this.globals.componentsPerTab = 2;
        break;
      
      // Desktop
      default:
        this.globals.screenSize = ScreenSizeEnum.Desktop;
        this.globals.componentsPerTab = 4;
        break;
    }

    if (this.prevScreenSize !== this.globals.screenSize) {
      this.prevScreenSize = this.globals.screenSize;
      this.globals.screenSizeObservable.next(this.globals.screenSize);
    }

  }
}
