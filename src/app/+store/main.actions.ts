import {CardFilter} from 'mtgsdk-ts';

export class GetData {
    static readonly type: string = '[MAIN] Get Data';

    constructor() {

    }
}

export class GetCards {
    static readonly type: string = '[MAIN] Get Cards';

    constructor(public searchParams: CardFilter) {

    }
}

export class GetSets {
    static readonly type: string = '[MAIN] Get Sets';
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


