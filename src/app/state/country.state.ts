import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Country } from '../models/country.model';
import { LoadMoreCountry, RefreshCountry } from '../actions/country.action';

export class CountryStateModel {
    countries: Country[];
}

@State<CountryStateModel>({
    name: 'country',
    defaults: {
        countries: []
    }
})
export class CountryState {

    // Get all countries
    @Selector() static getCountry(state: CountryStateModel) {
        return state.countries;
    }

    // Load a countries
    @Action(LoadMoreCountry)
    load(context: StateContext<CountryStateModel>, action: LoadMoreCountry) {
        const state = context.getState();
        context.patchState({
            countries: [...state.countries, ...action.payload]
        });
    }

    // Refresh a countries, set empty array
    @Action(RefreshCountry)
    refresh(context: StateContext<CountryStateModel>, action: RefreshCountry) {
        context.patchState({
            countries: []
        });
    }
}