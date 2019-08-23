import {Component, Input, OnInit} from '@angular/core';

import {MainService} from '../../../+store/main.service';
import {QuizQuestion} from '../quiz-question.model';
import {map} from 'rxjs/operators';
import {QuizQuestionService} from '../quiz-question.service';
import {fadeOutRightBigAnimation} from 'angular-animations';
import {Card} from '../../../+store/card.model';

export interface Answer extends Card {
    animate: boolean;
    hide: boolean;
}

@Component({
    selector: 'app-whats-the-name',
    templateUrl: './whats-the-name.component.html',
    styleUrls: ['./whats-the-name.component.scss'],
    animations: [
        fadeOutRightBigAnimation()
    ]
})
export class WhatsTheNameComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;

    answers: Answer[];

    constructor(public mainService: MainService, public quizQuestionService: QuizQuestionService) {
    }

    ngOnInit() {
        this.prepare();
    }

    prepare(): void {
        this.mainService.getRandomCards(4).pipe(
            map((answers: Answer[]) => [...answers, <Answer>this.card]),
            map((answers: Answer[]) => answers.map((answer: Card) => {
                return {
                    ...answer,
                    animate: false,
                    hide: false
                };
            })),
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

    validate(value: any): void {
        this.answers.forEach((answer: Answer) => {
            if (answer.name !== this.card.name) {
                answer.animate = true;
            }
        });
    }

    onAnimationEvent($event, answer: Answer): void {
        if ($event.toState === true && $event.phaseName === 'done') {
            answer.hide = true;
        }

    }

    emitAnswer(answer: boolean) {
        this.quizQuestionService.emitAnswer(answer);
    }
}
