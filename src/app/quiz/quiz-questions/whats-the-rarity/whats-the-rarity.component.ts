import {Component, Input, OnInit} from '@angular/core';
import {Answer, QuizQuestion} from '../quiz-question.model';
import {Card} from '../../../+store/card.model';
import {RARITY} from '../../../+store/main.state';
import {fadeOutRightBigAnimation} from 'angular-animations';
import {TIME_TO_NEXT_CARD} from '../../quiz.page';
import {QuizService} from "../../quiz.service";
import isEqual from "lodash-ts/isEqual";

@Component({
    selector: 'app-whats-the-rarity',
    templateUrl: './whats-the-rarity.component.html',
    styleUrls: ['./whats-the-rarity.component.scss'],
    animations: [
        fadeOutRightBigAnimation()
    ]
})
export class WhatsTheRarityComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;

    answers: Answer[];

    showSolution = false;

    constructor(private quizService: QuizService) {
    }

    ngOnInit() {
        this.answers = RARITY.map((rarity: string) => {
            return {
                value: rarity,
                correct: this.card.rarity.toLowerCase() === rarity.toLowerCase(),
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
