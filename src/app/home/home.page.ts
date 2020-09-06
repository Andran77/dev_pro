import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Storage } from '@ionic/storage';
import { Observable, Subscription } from 'rxjs';

import { CountryState } from '../state/country.state';
import { Country } from '../models/country.model';
import { LoadMoreCountry, RefreshCountry, GetCountry } from '../actions/country.action';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {

  pageCount = 0;
  loading = true;
  disableLoad = true;
  subscription: Subscription;

  @Select(CountryState.getCountryList) countries$: Observable<Country[]>;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private store: Store
  ) {
    this.getCountry();
  }

  ngOnInit() {
    this.subscription = this.countries$.subscribe(data => {
      if (data && data.length) {
        this.loading = false;
        this.disableLoad = this.pageCount*10 === data.length;
      }
    })
  }

  ionViewDidLeave() {
    this.loading = false;
    this.pageCount = 0;
    this.storage.remove('token');
    this.store.dispatch(new RefreshCountry());
    this.subscription.unsubscribe()
  }

  getCountry() {
    this.pageCount++;
    this.store.dispatch(new GetCountry());
  }

  async loadCountry() {
    this.pageCount++;
    this.store.dispatch(new LoadMoreCountry(this.pageCount));
  }

  logout() {
    this.navCtrl.navigateRoot('login');
  }
}
