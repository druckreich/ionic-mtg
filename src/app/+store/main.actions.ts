import {Game} from "src/app/+store/game.model";

export class PrepareData {
    static readonly type: string = '[MTG] Prepare Data';

    constructor() {

    }
}

export class PrepareDataSuccess {
    static readonly type: string = '[MTG] Prepare Data Success';

    constructor() {

    }
}

export class UpdateGame {
    static readonly type: string = '[MTG] Update Game';

    constructor(public game: Game) {

    }
}

export class UpdateGameRandomCard {
    static readonly type: string = '[MTG] Update Random Card';

    constructor() {

    }
}

export class UpdateGameQuestion {
    static readonly type: string = '[MTG] Update Game Question';

    constructor(public question: string) {

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


export class UpdateGameOver {
    static readonly type: string = '[MTG] Update Game Over';

    constructor() {

    }
}
