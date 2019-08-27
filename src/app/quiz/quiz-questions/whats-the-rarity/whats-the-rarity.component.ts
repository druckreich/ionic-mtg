import {Component, Input, OnInit} from '@angular/core';
import {QuizQuestion} from '../quiz-question.model';
import {Card} from '../../../+store/card.model';
import {RARITY, TYPE} from '../../../+store/main.state';
import {QuizQuestionService} from '../quiz-question.service';
import {fadeOutRightBigAnimation} from 'angular-animations';

export interface Answer {
    rarity: string;
    correct: boolean;
    hide: boolean;
}

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

    constructor(private quizQuestionService: QuizQuestionService) {
    }

    ngOnInit() {
        this.answers = RARITY.map((rarity: string) => {
            return {
                rarity: rarity,
                correct: this.card.rarity === rarity,
                hide: false
            };
        });
    }

    prepare(): void {

    }

    validate(value: Answer): void {
        this.showSolution = true;
        setTimeout(() => {
            this.emitAnswer(value.rarity === this.card.rarity);
        }, 2000);
    }

    onAnimationEvent($event, answer: Answer): void {
        if ($event.toState === true && $event.phaseName === 'done') {
            answer.hide = true;
        }
    }

    emitAnswer(answer: boolean) {
        this.quizQuestionService.emitAnswer(answer);
    }

}
