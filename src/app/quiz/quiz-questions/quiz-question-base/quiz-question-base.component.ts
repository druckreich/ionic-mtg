import {Component, OnInit} from '@angular/core';
import {Answer, QuizQuestion} from "src/app/quiz/quiz-questions/quiz-question.model";
import {Card} from "src/app/+store/card.model";
import {QuizService} from "src/app/quiz/quiz.service";

@Component({
    selector: 'app-quiz-question-base',
    templateUrl: './quiz-question-base.component.html',
    styleUrls: ['./quiz-question-base.component.scss'],
})
export class QuizQuestionBaseComponent implements OnInit, QuizQuestion {

    card: Card;
    question: string;
    answers: Answer[];
    showSolution: boolean = false;
    showButton: boolean = true;

    constructor(public quizService: QuizService) {
    }

    ngOnInit() {
    }

    prepare(): void {
    }

    validate(): void {
        if(this.showSolution === false) {
            const incorrectAnswer: Answer = this.answers.find((answer) => answer.correct !== answer.selected);
            this.quizService.emitAnswer(!incorrectAnswer);
            this.showSolution = true;
        } else {
            this.quizService.emitAnswer(true);
            this.showButton = false;
        }
    }

}
