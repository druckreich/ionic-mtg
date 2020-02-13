import {Component, Input, OnInit} from '@angular/core';
import {Answer, QuizQuestion} from '../quiz-question.model';
import {Card} from 'src/app/+store/card.model';
import {COLOR} from 'src/app/+store/main.state';
import {QuizService} from '../../quiz.service';
import {quizQuestionTrigger} from "src/app/quiz/quiz-questions/animations";
import {cardValueToAnswer} from "src/app/shared/util";

@Component({
    selector: 'app-whats-the-color',
    templateUrl: './whats-the-color.component.html',
    styleUrls: ['./whats-the-color.component.scss'],
    animations: [quizQuestionTrigger]
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
            return cardValueToAnswer(color, this.card.colors.includes(color));
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
