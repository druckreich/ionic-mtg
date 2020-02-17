import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {Card} from '../+store/card.model';
import {Observable} from 'rxjs';
import {QuizService} from "./quiz.service";
import {ToastController} from "@ionic/angular";
import {Game} from "src/app/+store/game.model";
import {
    UpdateGame,
    UpdateGameCorrectAnswer,
    UpdateGameRandomCard,
    UpdateGameWrongAnswer
} from "src/app/+store/main.actions";

export const TIME_TO_NEXT_CARD = 1500;

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss']
})
export class QuizPage implements OnInit {

    game$: Observable<Game> = this.store.select(state => state['mtg'].game);

    showBorderArt: boolean = false;
    showQuizButtons: boolean = false;

    constructor(public store: Store, public quizService: QuizService, public toastController: ToastController) {
    }

    ngOnInit() {
    }

    showNextCard() {
        this.showQuizButtons = false;
        this.store.dispatch(new UpdateGameRandomCard());
    }

    toggleShowBorderArt(): void {
        this.showBorderArt = !this.showBorderArt;
    }

    handleQuizQuestionResult(result: boolean) {
        this.showQuizButtons = true;
        if(result === true) {
            this.store.dispatch(new UpdateGameCorrectAnswer());
        } else {
            this.store.dispatch(new UpdateGameWrongAnswer());
        }
    }

    async presentToastWithOptions() {
        /*
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
         */
    }

}
