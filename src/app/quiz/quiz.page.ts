import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {MainService} from '../+store/main.service';
import {takeUntil} from 'rxjs/operators';
import {Card} from '../+store/card.model';
import {Observable, Subject} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {BannerComponent} from './banner/banner.component';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss']
})
export class QuizPage implements OnInit, OnDestroy {

    cards: Card[];

    quizStatus = null;

    currentCard$: Observable<Card>;
    currentCardLoaded = false;
    cardIndex = 0;
    errors = 0;
    maxErrors = 3;
    results: any[] = [];

    destroy$: Subject<any> = new Subject();

    constructor(public store: Store, public mainService: MainService, public modalController: ModalController) {
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
        this.presentModal();
    }

    handleRestart() {
        this.cardIndex = 0;
        this.errors = 0;
        this.startQuiz();
    }

    showNextCard() {
        if (this.errors >= this.maxErrors) {
            this.stopQuiz();
        } else {
            this.currentCardLoaded = false;
            this.currentCard$ = this.mainService.getRandomCard();
            this.cardIndex++;
        }
    }

    onQuizCardLoaded(): void {
        this.currentCardLoaded = true;
    }

    handleQuizResult(result: boolean): void {
        if (result === false) {
            this.errors++;
        }
        this.results.push(result);
        this.showNextCard();
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: BannerComponent,
            showBackdrop: true,
            cssClass: 'banner'
        });
        modal.onDidDismiss().then((data: any) => {
            if (data.data.restart === true) {
                this.handleRestart();
            }
        });
        return await modal.present();

    }

}
