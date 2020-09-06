export class GetCountry {
    static readonly type = '[Country] RefreshCountry';

    constructor() { }
}

export class LoadMoreCountry {
    static readonly type = '[Country] LoadMoreCountry';

    constructor(public id: number) { }
}

export class RefreshCountry {
    static readonly type = '[Country] RefreshCountry';

    constructor() { }
}
