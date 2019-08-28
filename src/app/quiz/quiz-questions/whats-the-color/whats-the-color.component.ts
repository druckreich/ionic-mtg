import {Component, Input, OnInit} from '@angular/core';
import {QuizQuestion} from '../quiz-question.model';
import {Card} from '../../../+store/card.model';
import {COLOR} from '../../../+store/main.state';
import isEqual from 'lodash-ts/isEqual';
import {fadeOutRightBigAnimation} from 'angular-animations';
import {QuizQuestionService} from '../quiz-question.service';


export interface Answer {
    color: string;
    correct: boolean;
    hide: boolean;
}

@Component({
    selector: 'app-whats-the-color',
    templateUrl: './whats-the-color.component.html',
    styleUrls: ['./whats-the-color.component.scss'],
    animations: [
        fadeOutRightBigAnimation()
    ]
})
export class WhatsTheColorComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;

    answers: Answer[];

    showSolution = false;

    selectedColor: string[] = [];


    constructor(private quizQuestionService: QuizQuestionService) {
    }

    ngOnInit() {
        this.answers = COLOR.map((color: string) => {
            return {
                color: color,
                correct: this.card.colors.includes(color),
                hide: false
            };
        });
    }

    prepare(): void {

    }

    validate(value: any): void {
        this.showSolution = true;
        setTimeout(() => {
            this.emitAnswer(isEqual(this.selectedColor, this.card.colors));
        }, 2000);
    }

    toggleColor(color: string): void {
        const index = this.selectedColor.indexOf(color);
        if (index === -1) {
            this.selectedColor.push(color);
        } else {
            this.selectedColor.splice(index, 1);
        }
    }

    isColorSelected(color: string): boolean {
        return this.selectedColor.includes(color);
    }

    emitAnswer(value: boolean): void {
        this.quizQuestionService.emitAnswer(value);
    }

}
