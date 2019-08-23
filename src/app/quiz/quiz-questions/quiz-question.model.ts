import {Card} from '../../+store/card.model';

export interface QuizQuestion {
    card: Card;

    prepare(): void;

    validate(value: any): void;

    emitAnswer(value: boolean): void;
}
