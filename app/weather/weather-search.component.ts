/**
 * Created by namita on 7/31/16.
 */

import {Component} from '@angular/core';
import {WeatherService} from './weather-service';
import {Weather} from './weather';
import {TemperaturePipe} from './temperature'

@Component({
    template: `
    <div>
        <div class="container">
        <div>
            <input type="text" [(ngModel)]="search.term" name="searchterm" #searchterm="ngModel" required>
             <button type="button" (click)= "getData()" class="btn btn-default">Submit</button>
        </div>
        <div>{{weather?.name}} {{weather?.country}}</div>
        <div>{{weather?.temperature |temperature}}</div>
        </div>
        <div class="col-md-6" *ngIf="weather.data">
         <table class="table table-striped">
            <thead>
            </thead>
            <tbody>
              <tr>
                <td>Wind Speed</td>
                <td>{{weather?.data?.wind}}m/s</td>
              </tr>
              <tr>
                <td>Sunrise</td>
                <td>{{weather?.data?.sunrise|date:'hh:mm:ss'}}</td>
              </tr>
               <tr>
                <td>Sunset</td>
                <td>{{weather?.data?.sunset|date:'hh:mm:ss'}}</td>
              </tr>
              <tr>
                <td>Pressure</td>
                <td>{{weather?.data?.pressure}} hpa</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td>{{weather?.data?.humidity}} %</td>
              </tr>
            </tbody>
        </table>
        </div>
    </div>
    `,
    pipes:[TemperaturePipe]
})

export class WeatherSearchComponent {
    private search = {term: ''};
    private weather:Weather = <Weather>{};

    constructor(private _weatherService:WeatherService) {
    }

    private data:Object = {};
    private errorMessage:any = '';

    getData() {
        this._weatherService.getData(this.search.term)
            .subscribe(
                data => {
                this.weather.name = data.name;
                this.weather.country = data.sys.country;
                this.weather.temperature = data.main.temp;
                this.weather.data = <any>{};
                this.weather.data.wind = data.wind.speed;
                this.weather.data.sunrise = data.sys.sunrise+'000';
                this.weather.data.sunset = data.sys.sunset+'000';
                this.weather.data.pressure = data.main.pressure;
                this.weather.data.humidity = data.main.humidity;

            },
                error => this.errorMessage = <any>error
        );
    }

}