import {Component, Input, OnInit} from '@angular/core';
import {Card} from 'src/app/+store/card.model';
import {TYPE} from 'src/app/+store/main.state';
import {Answer, QuizQuestion} from '../quiz-question.model';
import {QuizService} from "../../quiz.service";
import {quizQuestionTrigger} from "src/app/quiz/quiz-questions/animations";
import {cardValueToAnswer} from "src/app/shared/util";
import {QuizQuestionBaseComponent} from "src/app/quiz/quiz-questions/quiz-question-base/quiz-question-base.component";

@Component({
    selector: 'app-whats-the-type',
    templateUrl: './whats-the-type.component.html',
    styleUrls: ['./whats-the-type.component.scss'],
    animations: [quizQuestionTrigger]
})
export class WhatsTheTypeComponent extends QuizQuestionBaseComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;

    answers: Answer[];

    defaultState: string = 'default';

    showSolution = false;

    constructor(public quizService: QuizService) {
        super(quizService);
    }

    ngOnInit() {
        this.answers = TYPE.map((type: string) => {
            const correct: boolean = this.card.type_line.includes(type);
            return cardValueToAnswer(type, correct);
        });
    }

    prepare(): void {

    }

    validate(): void {
        super.validate();
    }
}
