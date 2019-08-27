import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../../+store/card.model';
import {QuizQuestionService} from '../quiz-question.service';
import {TYPE} from '../../../+store/main.state';
import {QuizQuestion} from '../quiz-question.model';
import isEqual from 'lodash-ts/isEqual';

export interface Answer {
    type: string;
    correct: boolean;
    hide: boolean;
}

@Component({
    selector: 'app-whats-the-type',
    templateUrl: './whats-the-type.component.html',
    styleUrls: ['./whats-the-type.component.scss'],
})
export class WhatsTheTypeComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;

    answers: Answer[];

    showSolution = false;

    selectedType: string[] = [];

    constructor(private quizQuestionService: QuizQuestionService) {
    }

    ngOnInit() {
        this.answers = TYPE.map((type: string) => {
            return {
                type: type,
                correct: this.card.type_line.includes(type),
                hide: false
            };
        });
    }

    prepare(): void {

    }

    validate(value: any): void {
        this.showSolution = true;
        setTimeout(() => {
            this.emitAnswer(isEqual(this.selectedType, this.card.type_line.split()));
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
