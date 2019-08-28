import {Component, Input, OnInit} from '@angular/core';
import {Answer, QuizQuestion} from '../quiz-question.model';
import {Card} from '../../../+store/card.model';
import {RARITY} from '../../../+store/main.state';
import {fadeOutRightBigAnimation} from 'angular-animations';
import {QuizQuestionService} from '../quiz-question.service';

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

    selectedAnswers: Answer[];

    constructor(private quizQuestionService: QuizQuestionService) {
    }

    ngOnInit() {
        this.answers = RARITY.map((rarity: string) => {
            return {
                value: rarity,
                correct: this.card.rarity.toLowerCase() === rarity.toLowerCase(),
                hide: false
            };
        });
    }

    prepare(): void {

    }

    validate(): void {
        this.showSolution = true;
        setTimeout(() => {
            this.emitAnswer(this.selectedAnswers[0].value === this.card.rarity);
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

    isAnswerSelected(answer: Answer): boolean {
        return this.selectedAnswers && this.selectedAnswers[0].value === answer.value;
    }

    selectAnswer(answer: Answer): void {
        this.selectedAnswers = [answer];
    }

}
