import {Component, Input, OnInit} from '@angular/core';

import {MainService} from '../../../+store/main.service';
import {Answer, QuizQuestion} from '../quiz-question.model';
import {map} from 'rxjs/operators';
import {Card} from '../../../+store/card.model';
import {QuizService} from "../../quiz.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-whats-the-name',
    templateUrl: './whats-the-name.component.html',
    styleUrls: ['./whats-the-name.component.scss'],
    animations: [
        trigger('changeState', [
            state('default', style({
                opacity: '1'
            })),
            state('false', style({
                opacity: '0.4'
            })),
            state('true', style({
                "font-weight": "bold",
            })),
            transition('*=>*', animate('300ms')),
        ])
    ]
})
export class WhatsTheNameComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;

    answers: Answer[];

    defaultState: string = 'default';

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
                        selected: false,
                        state: 'false'
                    };
                }
            )),
            map((answers: Answer[]) => {
                    return [
                        ...answers,
                        {
                            value: this.card.name,
                            correct: true,
                            selected: false,
                            state: 'true'
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
        const incorrectAnswer: Answer = this.answers.find((answer) => answer.correct !== answer.selected);
        this.quizService.emitAnswer(!incorrectAnswer);
        this.showSolution = true;
    }
}
