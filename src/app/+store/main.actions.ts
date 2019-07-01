import {MTGCard, MTGCardSearchParams} from './main.model';
import * as Magic from 'mtgsdk-ts';

export class GetSets {
    static readonly type: string = '[MAIN] Get Sets';

    constructor() {

    }
}

export class GetCards {
    static readonly type: string = '[MAIN] Get Cards';

    constructor(public searchParams: Magic.CardFilter) {

    }
}

export class GetCardsSuccess {
    static readonly type: string = '[MAIN] Get Cards Success';

    constructor(public cards: MTGCard) {

    }
}

export class GetTypes {
    static readonly type: string = '[MAIN] Get Types';
}

export class GetSubtypes {
    static readonly type: string = '[MAIN] Get Subtypes';
}

export class GetSupertypes {
    static readonly type: string = '[MAIN] Get Supertypes';
}


export class SetFavourite {
    static readonly type: string = '[MAIN] Set Favourite';

    constructor(public card: MTGCard) {

    }
}
