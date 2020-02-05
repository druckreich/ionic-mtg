import {Component, Input, OnInit} from '@angular/core';
import {Answer, QuizQuestion} from '../quiz-question.model';
import {Card} from '../../../+store/card.model';
import {RARITY} from '../../../+store/main.state';
import {QuizService} from "../../quiz.service";
import isEqual from "lodash-ts/isEqual";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-whats-the-rarity',
    templateUrl: './whats-the-rarity.component.html',
    styleUrls: ['./whats-the-rarity.component.scss'],
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
export class WhatsTheRarityComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;

    answers: Answer[];

    defaultState: string = 'default';

    showSolution = false;

    constructor(private quizService: QuizService) {
    }

    ngOnInit() {
        this.answers = RARITY.map((rarity: string) => {
            let correct: boolean = this.card.rarity.toLowerCase() === rarity.toLowerCase();
            return {
                value: rarity,
                correct: correct,
                state: correct ? 'true' : 'false',
                selected: false
            };
        });
    }

    prepare(): void {

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
