import {Component, OnInit} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {ToastController} from "@ionic/angular";
import {Game} from "src/app/+store/game.model";
import {MainState} from "src/app/+store/main.state";
import {GameService} from "src/app/+store/game.service";

export const TIME_TO_NEXT_CARD = 1500;

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss']
})
export class QuizPage implements OnInit {

    @Select(MainState.game)
    game$: Observable<Game>;

    showBorderArt: boolean = false;
    showQuizButtons: boolean = false;

    constructor(public toastController: ToastController) {
    }

    ngOnInit() {
    }

    showNextCard() {
        this.showQuizButtons = false;
        GameService.updateCard();
    }

    toggleShowBorderArt(): void {
        this.showBorderArt = !this.showBorderArt;
    }

    handleQuizQuestionResult(result: boolean): void {
        this.showQuizButtons = true;
        if (result === true) {
            GameService.handleCorrectAnswer();
        } else {
            GameService.handleWrongAnswer();
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
