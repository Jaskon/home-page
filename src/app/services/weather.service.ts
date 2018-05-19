import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City, Coords, Weather, WeekWeatherObj } from '../interfaces/interfaces';

@Injectable()
export class WeatherService {

    city: City = {name: null}
    weather: Weather = {current: {}, week: []}
    coords: Coords = {latitude: null, longitude: null}

    constructor(private http: HttpClient) {
        this.http.get('https://ipapi.co/json/')
        .subscribe((data: any) => {
            // City name (in eng)
            this.city.name = data.city;
            // User coords
            this.coords.latitude = data.latitude;
            this.coords.longitude = data.longitude;

            // Getting current weather of these coords
            this.weather.current = {};
            this.http.get(`https://api.openweathermap.org/data/2.5/weather?`
                + `lat=${this.coords.latitude}&lon=${this.coords.longitude}&APPID=ee744dc2aa33c498caf7703e2ddba526`)
            .subscribe((data: any) => {
                this.weather.current = {
                  temp: data.main.temp - 273.15,
                  clouds: this.reformatClouds(data.weather[0].main)
                };
            }, (error: any) => {
                console.log(error);
            });

            // Getting week weather of these coords
            this.weather.week = [];
            this.http.get(`https://api.openweathermap.org/data/2.5/forecast?`
                + `lat=${this.coords.latitude}&lon=${this.coords.longitude}&APPID=ee744dc2aa33c498caf7703e2ddba526`)
            .subscribe((data: any) => {
                var dates: any = {};
                data.list.forEach((elem) => {
                    var weatherObj: WeekWeatherObj = {
                        date: new Date(elem.dt * 1000),
                        temp: Math.round(elem.main.temp - 273.15),
                        clouds: this.reformatClouds(elem.weather[0].main)
                    };
                    var dayKey = weatherObj.date.getDay();
                    if (!dates[dayKey])
                        dates[dayKey] = [];
                    dates[dayKey].push(weatherObj);
                });
                for (var date in dates) {
                    this.weather.week.push(dates[date]);
                }
            }, (error: any) => {
                console.log(error);
            })
        }, (error: any) => {
            console.log(error);
        });
    }

    reformatClouds(input: string): string {
        var clouds: string;

        switch (input) {
            case "Rain":
                clouds = 'Дождь';
                break;

            case "Clouds":
                clouds = 'Облачно';
                break;

            case "Clear":
                clouds = 'Ясно';
                break;
            
            default:
                clouds = input;
        }

        return clouds;
    }

}
