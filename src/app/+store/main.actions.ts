import {MTGCard, MTGCardSearchParams} from './main.model';

export class LoadSets {
    static readonly type: string = '[MAIN] Load Sets';

    constructor() {

    }
}

export class LoadCards {
    static readonly type: string = '[MAIN] Load Cards';

    constructor(public searchParams: MTGCardSearchParams) {

    }
}

export class SetFavourite {
    static readonly type: string = '[MAIN] Set Favourite';

    constructor(public card: MTGCard) {

    }
}
