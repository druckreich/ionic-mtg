import {Card} from "./card.model";

export class PrepareCards {
    static readonly type: string = '[MTG] Prepare Cards';

    constructor() {

    }
}

export class PrepareGame {
    static readonly type: string = '[MTG] Prepare Game';

    constructor(public type: string) {

    }
}

export class RandomCard {
    static readonly type: string = '[MTG] Random Card';

    constructor() {

    }
}

export class GetRandomCards {
    static readonly type: string = '[MTG] Get Random Cards';

    constructor(public num: number) {

    }
}

export class GetRandomCardsSuccess {
    static readonly type: string = '[MTG] Get Random Cards Success';

    constructor(public card: Card[]) {

    }
}
