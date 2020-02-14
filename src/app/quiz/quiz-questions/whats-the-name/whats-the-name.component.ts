import {Component, Input, OnInit} from '@angular/core';
import {Answer, QuizQuestion} from 'src/app/quiz/quiz-questions/quiz-question.model';
import {Card} from 'src/app/+store/card.model';
import {QuizService} from "../../quiz.service";
import {Store} from "@ngxs/store";
import {cardValueToAnswer, getRandomElementsFrom} from "src/app/shared/util";
import {quizQuestionTrigger} from "src/app/quiz/quiz-questions/animations";
import {QuizQuestionBaseComponent} from "src/app/quiz/quiz-questions/quiz-question-base/quiz-question-base.component";


@Component({
    selector: 'app-whats-the-name',
    templateUrl: './whats-the-name.component.html',
    styleUrls: ['./whats-the-name.component.scss'],
    animations: [quizQuestionTrigger]
})
export class WhatsTheNameComponent extends QuizQuestionBaseComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;
    question: string = "Welchen Namen hat diese Karte?";
    answers: Answer[];
    defaultState: string = 'default';
    showSolution = false;

    constructor(public store: Store, public quizService: QuizService) {
        super(quizService);
    }

    ngOnInit() {
        this.prepare();
    }

    prepare(): void {
        const cards: Card[] = this.store.selectSnapshot(s => s['mtg'].cards);
        const randomCards: Card[] = getRandomElementsFrom(cards, 4);
        const answers: Answer[] = randomCards.map((card: Card) => cardValueToAnswer(card.name, false));
        this.answers = [
            ...answers,
            cardValueToAnswer(this.card.name, true)
        ]
    }

    selectAnswer(answer: Answer): void {
        this.answers.forEach((answer: Answer) => answer.selected = false);
        answer.selected = true;
    }

    validate(): void {
        super.validate();
    }
}
