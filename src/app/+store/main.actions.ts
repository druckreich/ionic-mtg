import {Game} from "src/app/+store/game.model";

export class PrepareCards {
    static readonly type: string = '[MTG] Prepare Cards';

    constructor() {

    }
}

export class UpdateGame {
    static readonly type: string = '[MTG] Update Game';

    constructor(public game: Game) {

    }
}

export class UpdateGameRandomCard {
    static readonly type: string = '[MTG] Random Card';

    constructor() {

    }
}

export class UpdateGameWrongAnswer {
    static readonly type: string = '[MTG] Update Game Wrong Answer';

    constructor() {

    }
}

export class UpdateGameCorrectAnswer {
    static readonly type: string = '[MTG] Update Game Correct Answer';

    constructor() {

    }
}
