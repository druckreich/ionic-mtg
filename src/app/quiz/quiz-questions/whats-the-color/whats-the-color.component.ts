import {Component, Input, OnInit} from '@angular/core';
import {Answer, QuizQuestion} from '../quiz-question.model';
import {Card} from '../../../+store/card.model';
import {COLOR} from '../../../+store/main.state';
import isEqual from 'lodash-ts/isEqual';
import {fadeOutRightBigAnimation} from 'angular-animations';
import {QuizQuestionService} from '../quiz-question.service';
import {TIME_TO_NEXT_CARD} from '../../quiz.page';

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

    selectedAnswers: Answer[] = [];

    constructor(private quizQuestionService: QuizQuestionService) {
    }

    ngOnInit() {
        this.answers = COLOR.map((color: string) => {
            return {
                value: color,
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
            this.emitAnswer(isEqual(this.quizQuestionService.getValues(this.selectedAnswers), this.card.colors));
        }, TIME_TO_NEXT_CARD);
    }

    selectAnswer(answer: Answer): void {
        const index = this.quizQuestionService.findIndexAnswer(this.selectedAnswers, answer);
        if (index === -1) {
            this.selectedAnswers.push(answer);
        } else {
            this.selectedAnswers.splice(index, 1);
        }
    }

    isAnswerSelected(answer: Answer): boolean {
        return this.quizQuestionService.findIndexAnswer(this.selectedAnswers, answer) !== -1;
    }

    onAnimationEvent($event, answer: Answer): void {
        if ($event.toState === true && $event.phaseName === 'done') {
            answer.hide = true;
        }
    }

    emitAnswer(value: boolean): void {
        this.quizQuestionService.emitAnswer(value);
    }
}
