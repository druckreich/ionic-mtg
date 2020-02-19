import {Card} from 'src/app/+store/card.model';

export interface Answer {
    correct: boolean;
    value: string;
    selected: boolean;
    state?: string;
}

export interface QuizQuestion {
    card: Card;
    question: string;
    answers: Answer[];
    showSolution: boolean;

    prepare(): void;

    validate(): void;
}
