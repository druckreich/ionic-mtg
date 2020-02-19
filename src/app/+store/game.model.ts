import {Card} from "./card.model";

export enum GAME_STATES {
    'RUN',
    'STOP',
    'PAUSE'
}

export class Game {
    type?: string;
    state?: GAME_STATES;
    card?: Card;
    question?: string;
    correctAnswers?: number;
    lives?: number;
}
