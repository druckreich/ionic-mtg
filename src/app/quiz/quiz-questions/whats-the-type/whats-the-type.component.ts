import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../../+store/card.model';
import {TYPE} from '../../../+store/main.state';
import {Answer, QuizQuestion} from '../quiz-question.model';
import isEqual from 'lodash-ts/isEqual';
import {fadeOutRightBigAnimation} from 'angular-animations';
import {TIME_TO_NEXT_CARD} from '../../quiz.page';
import {QuizService} from "../../quiz.service";

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

    constructor(private quizService: QuizService) {
    }

    ngOnInit() {
        this.answers = TYPE.map((type: string) => {
            return {
                value: type,
                correct: this.card.type_line.includes(type),
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
