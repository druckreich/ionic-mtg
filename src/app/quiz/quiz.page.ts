import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Card} from '../+store/card.model';
import {Observable, Subject} from 'rxjs';
import {QuizService} from "./quiz.service";
import {RandomCard, UpdateGame} from "../+store/main.actions";
import {COLOR, MainState, MainStateModel} from "../+store/main.state";
import {ToastController} from "@ionic/angular";
import {GAME_STATES} from "src/app/+store/game.model";

export const TIME_TO_NEXT_CARD = 1500;

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss']
})
export class QuizPage implements OnInit, OnDestroy {

    gameState$: Observable<string> = this.store.selectSnapshot(state => state['mtg'].game.state);
    currentCard$: Observable<Card> = this.store.select(state => state['mtg'].game.card);

    cardIndex = 0;

    quizQuestion: string;
    correctAnswers: number;
    lives: string[];
    wasLastAnswerCorrect: boolean = false;
    isShowBorderArtButtonVisible: boolean = false;
    showBorderArt: boolean = false;

    destroy$: Subject<any> = new Subject();

    constructor(public store: Store, public quizService: QuizService, public toastController: ToastController) {
    }

    ngOnInit() {
        console.log(this.gameState$);
        this.store.dispatch(new UpdateGame({state: GAME_STATES.STOP}));
        this.startQuiz();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    startQuiz() {
        this.cardIndex = 0;
        this.correctAnswers = 0;
        this.wasLastAnswerCorrect = false;
        this.isShowBorderArtButtonVisible = false;
        this.lives = [...COLOR];
        this.store.dispatch(new UpdateGame({state: GAME_STATES.RUN}));
        this.showNextCard();
    }

    stopQuiz() {
        this.presentToastWithOptions();
    }

    showNextCard() {
        if (this.lives.length <= 0) {
            this.stopQuiz();
            return;
        }

        // hode border art and disable button
        this.showBorderArt = false;
        this.isShowBorderArtButtonVisible = false;

        this.cardIndex++;
        this.quizService.cardLoaded(false);
        //this.store.dispatch(new RandomCard()).subscribe((state: MainStateModel) => {
            //this.currentCard = state['mtg'].game.card;
        //})
    }

    handleQuizQuestionResult(card: Card, result: boolean) {
        this.quizQuestion = "";
        this.wasLastAnswerCorrect = true;
        if (result === false) {
            this.lives.shift();
            this.wasLastAnswerCorrect = false;
        } else {
            this.correctAnswers++;
        }
        this.isShowBorderArtButtonVisible = true;
    }

    async presentToastWithOptions() {
        const toast = await this.toastController.create({
            message: 'Well done! ' + (this.cardIndex - 1) + ' correct answers is not bad!',
            position: 'middle',
            buttons: [
                {
                    side: 'end',
                    text: 'Hit me one more time!',
                    handler: () => {
                        this.startQuiz();
                    }
                }
            ]
        });
        toast.present();
    }

    updateGame(): void {

    }
}
