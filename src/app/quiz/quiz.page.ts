import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {ActivatedRoute} from '@angular/router';
import {MainService} from '../+store/main.service';
import {delay, map, takeUntil} from 'rxjs/operators';
import {Card} from '../+store/card.model';
import {of, Subject} from 'rxjs';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss']
})
export class QuizPage implements OnInit, OnDestroy {

    cards: Card[];

    quizStatus = null;
    cardsNumber: number;
    currentCard: Card;
    cardIndex = 0;
    currentCardLoaded = false;
    showBackdrop = false;

    results: any[] = [];

    destroy$: Subject<any> = new Subject();

    constructor(public store: Store, public activatedRoute: ActivatedRoute, public mainService: MainService) {
    }

    ngOnInit() {
        this.quizStatus = 'PREPARING';
        this.cardsNumber = +this.activatedRoute.snapshot.queryParams['cardsNumber'];
        this.mainService.cards$.pipe(
            takeUntil(this.destroy$),
            map((cards: Card[]) => {
                return cards.filter((card: Card) => {
                    return card.legalities.standard === 'legal';
                });
            })
        ).subscribe((cards: Card[]) => {
            this.cards = cards;
            this.startQuiz();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }


    startQuiz() {
        this.quizStatus = 'STARTED';
        this.showBackdrop = false;
        this.cardIndex = 0;
        this.showNextCard();
    }

    stopQuiz() {
        this.showBackdrop = true;
        this.quizStatus = 'SHOW_RESULT';
    }

    showNextCard() {
        if (this.cardIndex < this.cardsNumber) {
            this.currentCardLoaded = false;
            this.cardIndex++;
            this.currentCard = this.getRandomCard();
        } else {
            this.stopQuiz();
        }
    }

    getRandomCard(): Card {
        const len = this.cards.length;
        const x = Math.floor(Math.random() * len);
        return this.cards[x];
    }

    onQuizCardLoaded(): void {
        this.currentCardLoaded = true;
    }

    handleQuizResult(result: boolean): void {
        this.results.push(result);
        this.showNextCard();
        /*
                this.showBanner = true;
                this.presentToast().then(() => {
                    this.showNextCard();
                    this.showBanner = false;
                    this.cd.markForCheck();
                });

        */
    }

    async presentToast() {
        return of().pipe(
            delay(2000)
        ).toPromise();
    }
}
