import {Component, Input, OnInit} from '@angular/core';
import {QuizQuestion} from '../quiz-question.model';
import {Card} from '../../../+store/card.model';
import {COLOR} from '../../../+store/main.state';
import {QuizQuestionService} from '../quiz-question.service';
import isEqual from 'lodash-ts/isEqual';

@Component({
    selector: 'app-whats-the-color',
    templateUrl: './whats-the-color.component.html',
    styleUrls: ['./whats-the-color.component.scss'],
})
export class WhatsTheColorComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;

    colors: string[] = COLOR;

    selectedColor: string[] = [];

    constructor(private quizQuestionService: QuizQuestionService) {
    }

    ngOnInit() {
    }

    prepare(): void {

    }

    validate(value: any): void {
        if (isEqual(this.selectedColor, this.card.colors)) {
            this.quizQuestionService.emitAnswer(true);
        } else {
            this.quizQuestionService.emitAnswer(false);
        }
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

}
