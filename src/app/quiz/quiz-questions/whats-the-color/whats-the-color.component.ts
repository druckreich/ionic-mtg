import {Component, Input, OnInit} from '@angular/core';
import {Answer, QuizQuestion} from '../quiz-question.model';
import {Card} from 'src/app/+store/card.model';
import {COLOR} from 'src/app/+store/main.state';
import {QuizService} from '../../quiz.service';
import {quizQuestionTrigger} from "src/app/quiz/quiz-questions/animations";
import {cardValueToAnswer} from "src/app/shared/util";
import {QuizQuestionBaseComponent} from "src/app/quiz/quiz-questions/quiz-question-base/quiz-question-base.component";

@Component({
    selector: 'app-whats-the-color',
    templateUrl: './whats-the-color.component.html',
    styleUrls: ['./whats-the-color.component.scss'],
    animations: [quizQuestionTrigger]
})

export class WhatsTheColorComponent extends QuizQuestionBaseComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;
    question: string = "Welche Farbe(n) hat diese Karte?";
    answers: Answer[];
    defaultState: string = 'default';
    showSolution: boolean = false;

    constructor(public quizService: QuizService) {
        super(quizService);
    }

    ngOnInit() {
        this.answers = COLOR.map((color: string) => {
            return cardValueToAnswer(color, this.card.colors.includes(color));
        });
    }

    prepare(): void {

    }
}
