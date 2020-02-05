import {Component, Input, OnInit} from '@angular/core';

import {MainService} from '../../../+store/main.service';
import {Answer, QuizQuestion} from '../quiz-question.model';
import {map} from 'rxjs/operators';
import {fadeOutRightBigAnimation} from 'angular-animations';
import {Card} from '../../../+store/card.model';
import {TIME_TO_NEXT_CARD} from '../../quiz.page';
import {QuizService} from "../../quiz.service";
import isEqual from "lodash-ts/isEqual";

@Component({
    selector: 'app-whats-the-name',
    templateUrl: './whats-the-name.component.html',
    styleUrls: ['./whats-the-name.component.scss'],
    animations: [
        fadeOutRightBigAnimation({duration: 250})
    ]
})
export class WhatsTheNameComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;

    answers: Answer[];

    selectedAnswer: Answer;

    showSolution = false;

    constructor(public mainService: MainService, public quizService: QuizService) {
    }

    ngOnInit() {
        this.prepare();
    }

    prepare(): void {
        this.mainService.getRandomCards(4).pipe(
            map((cards: Card[]) => cards.map((card: Card) => {
                    return {
                        value: card.name,
                        correct: false,
                        hide: false,
                        selected: false
                    };
                }
            )),
            map((answers: Answer[]) => {
                    return [
                        ...answers,
                        {
                            value: this.card.name,
                            correct: true,
                            hide: false,
                            selected: false
                        }
                    ];
                }
            ),
            map((answers: Answer[]) => {
                let j, x, i;
                for (i = answers.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    x = answers[i];
                    answers[i] = answers[j];
                    answers[j] = x;
                }
                return answers;
            })
        ).subscribe((answers: Answer[]) => this.answers = answers);
    }

    selectAnswer(answer: Answer): void {
        this.answers.forEach((answer: Answer) => answer.selected = false);
        answer.selected = true;
    }

    validate(): void {
        const isAnswerCorrect: boolean = this.selectedAnswer && this.selectedAnswer.value.toLowerCase() === this.card.name.toLowerCase();
        this.quizService.emitAnswer(isAnswerCorrect);
        this.showSolution = true;
    }

    onAnimationEvent($event, answer: Answer): void {
        if ($event.toState === true && $event.phaseName === 'done') {
            answer.hide = true;
        }
    }
}
