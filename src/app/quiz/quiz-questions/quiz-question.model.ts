import {Card} from '../../+store/card.model';

export interface Answer {
    hide: boolean;
    correct: boolean;
    value: string;
    selected: boolean;
}

export interface QuizQuestion {
    card: Card;

    answers: Answer[];

    prepare(): void;

    validate(value: any): void;

    onAnimationEvent($event, answer: Answer): void;
}
