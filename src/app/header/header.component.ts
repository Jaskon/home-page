import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { City, Coords, Weather } from '../interfaces/interfaces';
import { Globals, ScreenSizeEnum } from '../globals';
import { Subject } from 'rxjs';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  screenType = ScreenSizeEnum;

  date: Date;

  city: City = null
  weather: Weather = null
  coords: Coords = null


  constructor(private wServ: WeatherService, public globals: Globals) { }

  ngOnInit() {
    // Datetime init
    this.date = new Date();
    setTimeout(() => {
      // Update time every second
      setInterval(() => {
        this.updateTime();
      });
    }, 1000 - this.date.getMilliseconds());


    // Current weather init
    this.city = this.wServ.city;
    this.weather = this.wServ.weather;
    this.coords = this.wServ.coords;
  }

  updateTime() {
    this.date = new Date();
  }


  searchInputEnterPressed(event) {
    window.open('https://www.google.com/search?q=' + encodeURIComponent(event.target.value));
  }

  editComponentsButtonClicked() {
    this.globals.editComponentsButtonObservable.next();
  }

}
