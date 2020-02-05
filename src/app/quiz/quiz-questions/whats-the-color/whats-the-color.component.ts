import {Component, Input, OnInit} from '@angular/core';
import {Answer, QuizQuestion} from '../quiz-question.model';
import {Card} from '../../../+store/card.model';
import {COLOR} from '../../../+store/main.state';
import isEqual from 'lodash-ts/isEqual';
import {QuizService} from "../../quiz.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-whats-the-color',
    templateUrl: './whats-the-color.component.html',
    styleUrls: ['./whats-the-color.component.scss'],
    animations: [
        trigger('changeState', [
            state('default', style({
                opacity: '1'
            })),
            state('false', style({
                opacity: '0.4'
            })),
            state('true', style({
                transform: 'scale(1.05)',
                "font-weight": "bold",
            })),
            transition('*=>*', animate('300ms')),
        ])
    ]
})
export class WhatsTheColorComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;

    answers: Answer[];

    defaultState: string = 'default';

    showSolution: boolean = false;

    constructor(private quizService: QuizService) {
    }

    ngOnInit() {
        this.answers = COLOR.map((color: string) => {
            return {
                value: color,
                correct: this.card.colors.includes(color),
                selected: false,
                state: this.card.colors.includes(color) ? 'true' : 'false'
            };
        });
    }

    prepare(): void {

    }

    validate(): void {
        const incorrectAnswer: Answer = this.answers.find((answer) => answer.correct !== answer.selected);
        this.quizService.emitAnswer(!incorrectAnswer);
        this.showSolution = true;
    }
}
