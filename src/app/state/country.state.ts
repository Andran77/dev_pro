import { State, Action, Selector, StateContext } from '@ngxs/store';
import {tap} from 'rxjs/operators';

import { Country } from '../models/country.model';
import { LoadMoreCountry, RefreshCountry, GetCountry } from '../actions/country.action';
import { CountryService } from '../services/country/country.service';
import { Injectable } from '@angular/core';

export class CountryStateModel {
    countries: Country[];
}

@State<CountryStateModel>({
    name: 'country',
    defaults: {
        countries: []
    }
})
@Injectable({
    providedIn: 'root'
})
export class CountryState {

    constructor(
        private countryService: CountryService
    ) {}

    @Selector() static getCountryList(state: CountryStateModel) {
        return state.countries;
    }

    @Action(GetCountry)
    get({getState, setState}: StateContext<CountryStateModel>) {
        return this.countryService.getCountries(1).pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                countries: result,
            });
        }));
    }

    @Action(LoadMoreCountry)
    load({getState, patchState}: StateContext<CountryStateModel>, {id}:  LoadMoreCountry) {
        return this.countryService.getCountries(id).pipe(tap((result) => {
            const state = getState();
            patchState({
                countries: [...state.countries, ...result],
            });
        }));
    }

    @Action(RefreshCountry)
    refresh({getState, setState}: StateContext<CountryStateModel>) {
        const state = getState();
        setState({
            ...state,
            countries: [],
        });
    }
}
