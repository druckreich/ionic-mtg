import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../../+store/card.model';
import {TYPE} from '../../../+store/main.state';
import {Answer, QuizQuestion} from '../quiz-question.model';
import isEqual from 'lodash-ts/isEqual';
import {QuizQuestionService} from '../quiz-question.service';
import {fadeOutRightBigAnimation} from 'angular-animations';

@Component({
    selector: 'app-whats-the-type',
    templateUrl: './whats-the-type.component.html',
    styleUrls: ['./whats-the-type.component.scss'],
    animations: [
        fadeOutRightBigAnimation({duration: 500})
    ]
})
export class WhatsTheTypeComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;

    answers: Answer[];

    showSolution = false;

    selectedAnswers: Answer[] = [];

    constructor(private quizQuestionService: QuizQuestionService) {
    }

    ngOnInit() {
        this.answers = TYPE.map((type: string) => {
            return {
                value: type,
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
            this.emitAnswer(isEqual(this.quizQuestionService.getValues(this.selectedAnswers), this.card.types));
        }, 2000);
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
