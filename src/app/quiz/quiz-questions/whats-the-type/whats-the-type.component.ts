import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../../+store/card.model';
import {TYPE} from '../../../+store/main.state';
import {Answer, QuizQuestion} from '../quiz-question.model';
import isEqual from 'lodash-ts/isEqual';
import {QuizService} from "../../quiz.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-whats-the-type',
    templateUrl: './whats-the-type.component.html',
    styleUrls: ['./whats-the-type.component.scss'],
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
export class WhatsTheTypeComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;

    answers: Answer[];

    defaultState: string = 'default';

    showSolution = false;

    constructor(private quizService: QuizService) {
    }

    ngOnInit() {
        this.answers = TYPE.map((type: string) => {
            const correct: boolean = this.card.type_line.includes(type);
            return {
                value: type,
                correct: correct,
                selected: false,
                state: correct ? 'true' : 'false'
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
