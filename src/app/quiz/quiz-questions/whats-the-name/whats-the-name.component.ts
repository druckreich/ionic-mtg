import {Component, Input, OnInit} from '@angular/core';

import {MainService} from '../../../+store/main.service';
import {Answer, QuizQuestion} from '../quiz-question.model';
import {map} from 'rxjs/operators';
import {fadeOutRightBigAnimation} from 'angular-animations';
import {Card} from '../../../+store/card.model';
import {QuizQuestionService} from '../quiz-question.service';

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

    selectedAnswers: Answer[];

    showSolution = false;

    constructor(public mainService: MainService, public quizQuestionService: QuizQuestionService) {
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
                        hide: false
                    };
                }
            )),
            map((answers: Answer[]) => {
                    return [
                        ...answers,
                        {
                            value: this.card.name,
                            correct: true,
                            hide: false
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
        this.selectedAnswers = [answer];
    }

    isAnswerSelected(answer: Answer): boolean {
        return this.selectedAnswers && this.selectedAnswers[0].value === answer.value;
    }

    validate(): void {
        this.showSolution = true;
        setTimeout(() => {
            this.emitAnswer(this.selectedAnswers[0].value === this.card.name);
        }, 2000);
    }

    emitAnswer(answer: boolean) {
        this.quizQuestionService.emitAnswer(answer);
    }

    onAnimationEvent($event, answer: Answer): void {
        if ($event.toState === true && $event.phaseName === 'done') {
            answer.hide = true;
        }
    }
}
