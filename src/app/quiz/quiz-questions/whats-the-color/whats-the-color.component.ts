import {Component, Input, OnInit} from '@angular/core';
import {Answer, QuizQuestion} from '../quiz-question.model';
import {Card} from '../../../+store/card.model';
import {COLOR} from '../../../+store/main.state';
import isEqual from 'lodash-ts/isEqual';
import {fadeOutRightBigAnimation} from 'angular-animations';
import {QuizService} from "../../quiz.service";

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

    constructor(private quizService: QuizService) {
    }

    ngOnInit() {
        this.answers = COLOR.map((color: string) => {
            return {
                value: color,
                correct: this.card.colors.includes(color),
                hide: false,
                selected: false
            };
        });
    }

    prepare(): void {

    }

    validate(): void {
        const selectedAnswerValues: any = this.answers.filter((answer) => answer.selected).map((a: Answer) => a.value);
        const isAnswerCorrect: boolean = isEqual(selectedAnswerValues, this.card.colors);
        this.quizService.emitAnswer(isAnswerCorrect);
        this.showSolution = true;
    }

    onAnimationEvent($event, answer: Answer): void {
        if ($event.toState === true && $event.phaseName === 'done') {
            answer.hide = true;
        }
    }
}
