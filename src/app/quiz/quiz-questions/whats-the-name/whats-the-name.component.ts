import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../../+store/card.model';
import {MainService} from '../../../+store/main.service';
import {Observable} from 'rxjs';
import {QuizQuestion} from '../quiz-question.model';
import {map, tap} from 'rxjs/operators';
import {QuizQuestionService} from '../quiz-question.service';

@Component({
    selector: 'app-whats-the-name',
    templateUrl: './whats-the-name.component.html',
    styleUrls: ['./whats-the-name.component.scss'],
})
export class WhatsTheNameComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;

    cards$: Observable<Card[]>;

    constructor(public mainService: MainService, public quizQuestionService: QuizQuestionService) {
    }

    ngOnInit() {
        this.prepare();
    }

    prepare(): void {
        this.cards$ = this.mainService.getRandomCards(4).pipe(
            map((cards: Card[]) => [...cards, this.card]),
            map((cards: Card[]) => {
                let j, x, i;
                for (i = cards.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    x = cards[i];
                    cards[i] = cards[j];
                    cards[j] = x;
                }
                return cards;
            })
        );
    }


    validate(value: any): void {
        if ((<Card>value).name === this.card.name) {
            this.quizQuestionService.emitAnswer(true);
        } else {
            this.quizQuestionService.emitAnswer(false);
        }
    }

}
