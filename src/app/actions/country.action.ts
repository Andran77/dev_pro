import { Country } from '../models/country.model';

export class LoadMoreCountry {
    static readonly type = '[Country] LoadMoreCountry';

    constructor(public payload: Country) { }
}

export class RefreshCountry {
    static readonly type = '[Country] RefreshCountry';

    constructor(public name: string) { }
}
