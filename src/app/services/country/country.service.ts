import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from 'src/app/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private http: HttpClient
  ) { }

  getCountries(id: number) {
    return this.http.get<Country[]>('https://getcountry.herokuapp.com/' + id + '/');
  }
}
