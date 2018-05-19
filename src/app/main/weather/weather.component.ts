import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { City, Coords, Weather } from '../../interfaces/interfaces';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  city: City = null
  weather: Weather = null
  coords: Coords = null

  constructor(private wServ: WeatherService) { }

  ngOnInit() {
    this.city = this.wServ.city;
    this.weather = this.wServ.weather;
    this.coords = this.wServ.coords
  }

}
