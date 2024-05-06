import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  http = inject(HttpClient);
  constructor() {}
  getWeatherToday() {
    return this.http.get(
      'https://api.weatherapi.com/v1/current.json?key=9829bcd4daf240e08c874622241204&q=Geneve&aqi=no&lang=fr'
    );
  }
}
