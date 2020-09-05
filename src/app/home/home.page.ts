import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

import { CountryState } from '../state/country.state';
import { Country } from '../models/country.model';
import { LoadMoreCountry, RefreshCountry } from '../actions/country.action';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {

  pageCount = 0;
  loading = true;
  cnt = 0;
  disableLoad = false;

  @Select(CountryState.getCountry) countries$: Observable<Country[]>;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private storage: Storage,
    private store: Store
  ) {
    this.loadCountry();
  }

  ngOnInit() {
    this.countries$.subscribe(data => {
      if (data && data.length) {
        this.loading = false;
        this.cnt = data.length
      }
    })
  }

  async loadCountry() {
    this.disableLoad = this.pageCount*10 === this.cnt;
    const countryPage = await this.getCountryByPage();
    this.store.dispatch(new LoadMoreCountry(
      countryPage['page_country']
    ));
  }

  getCountryByPage() {
    const page = ++this.pageCount;
    return this.http.get('https://getcountry.herokuapp.com/' + page + '/').toPromise();
  }

  logout() {
    this.loading = false;
    this.pageCount = 1;
    this.storage.remove('token');
    this.store.dispatch(new RefreshCountry());
    this.navCtrl.navigateRoot('login');
  }

}
