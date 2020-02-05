import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {MainService} from '../+store/main.service';
import {takeUntil, tap} from 'rxjs/operators';
import {Card} from '../+store/card.model';
import {Observable, Subject} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {BannerComponent} from './banner/banner.component';
import {QuizService} from "./quiz.service";

export const TIME_TO_NEXT_CARD = 1500;

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss']
})
export class QuizPage implements OnInit, OnDestroy {

    cards: Card[];

    quizStatus = null;

    currentCard$: Observable<Card>;
    cardIndex = 0;
    errors = 0;
    maxErrors = 3;
    results: any[] = [];

    destroy$: Subject<any> = new Subject();

    constructor(public store: Store, public mainService: MainService, public quizService: QuizService, public modalController: ModalController) {
    }

    ngOnInit() {
        this.quizStatus = 'PREPARING';
        this.mainService.cards$.pipe(
            takeUntil(this.destroy$)
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
        this.cardIndex = 0;
        this.showNextCard();
    }

    stopQuiz() {
        this.quizStatus = 'STOPPED';
    }

    showNextCard() {
        if (this.errors >= this.maxErrors) {
            this.stopQuiz();
        } else {
            this.quizService.cardLoaded(false);
            this.currentCard$ = this.mainService.getRandomCard().pipe(
                tap((card: Card) => console.log(card))
            );
            this.cardIndex++;
        }
    }

    async handleQuizQuestionResult(card: Card, result: boolean) {
        if (result === false) {
            this.errors++;
        }
        await this.presentModal(card);
        this.results.push(result);
    }

    async presentModal(card: Card) {
        const modal = await this.modalController.create({
            component: BannerComponent,
            showBackdrop: true,
            cssClass: 'banner',
            componentProps: {
                'card': card
            }
        });
        modal.onDidDismiss().then((data: any) => {
            if (data.data['next'] === true) {
                this.showNextCard();
            }
        });
        return await modal.present();
    }

}
