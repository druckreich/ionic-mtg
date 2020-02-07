import {Component, Input, OnInit} from '@angular/core';
import {Answer, QuizQuestion} from '../quiz-question.model';
import {Card} from '../../../+store/card.model';
import {QuizService} from "../../quiz.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Store} from "@ngxs/store";

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

    constructor(public store: Store, public quizService: QuizService) {
    }

    ngOnInit() {
        this.prepare();
    }

    prepare(): void {
        this.answers = [{
            value: this.card.name,
            correct: false,
            selected: false,
            state: 'false'
        }

        ]
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
