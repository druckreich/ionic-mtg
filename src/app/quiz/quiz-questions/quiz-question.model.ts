import {Card} from '../../+store/card.model';

export interface Answer {
    hide: boolean;
    correct: boolean;
    value: string;
}

export interface QuizQuestion {
    card: Card;

    answers: Answer[];

    selectedAnswers: Answer[];

    prepare(): void;

    validate(value: any): void;

    emitAnswer(value: boolean): void;

    selectAnswer(answer: Answer): void;

    isAnswerSelected(answer: Answer): boolean;

    onAnimationEvent($event, answer: Answer): void;
}
