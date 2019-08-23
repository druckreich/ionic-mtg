import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../../+store/card.model';
import {MainService} from '../../../+store/main.service';
import {QuizQuestion} from '../quiz-question.model';
import {map} from 'rxjs/operators';
import {QuizQuestionService} from '../quiz-question.service';
import {fadeOutRightBigAnimation} from 'angular-animations';

export interface Answer extends Card {
    animate: boolean;
    hide: boolean;
}

@Component({
    selector: 'app-whats-the-name',
    templateUrl: './whats-the-name.component.html',
    styleUrls: ['./whats-the-name.component.scss'],
    animations: [
        fadeOutRightBigAnimation()
    ]
})
export class WhatsTheNameComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;

    cards: Answer[];

    constructor(public mainService: MainService, public quizQuestionService: QuizQuestionService) {
    }

    ngOnInit() {
        this.prepare();
    }

    prepare(): void {
        this.mainService.getRandomCards(4).pipe(
            map((cards: Answer[]) => [...cards, this.card]),
            map((cards: Answer[]) => cards.map((card: Card) => {
                return {
                    ...card,
                    animate: false,
                    hide: false
                };
            })),
            map((cards: Answer[]) => {
                let j, x, i;
                for (i = cards.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    x = cards[i];
                    cards[i] = cards[j];
                    cards[j] = x;
                }
                return cards;
            })
        ).subscribe((cards: Answer[]) => this.cards = cards);
    }

    validate(value: any): void {
        this.cards.forEach((card: Answer) => {
            if (card.name !== this.card.name) {
                card.animate = true;
            }
        });
    }

    onAnimationEvent($event, card: Answer): void {
        if ($event.toState === true && $event.phaseName === 'done') {
            card.hide = true;
        }

    }

    emitAnswer(answer: boolean) {
        this.quizQuestionService.emitAnswer(answer);
    }
}
