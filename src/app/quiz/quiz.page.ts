import {Component, ComponentRef, OnInit} from '@angular/core';
import {Actions, ofActionDispatched, Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Game} from "src/app/+store/game.model";
import {MainState} from "src/app/+store/main.state";
import {GameService} from "src/app/+store/game.service";
import {UpdateGameOver} from "src/app/+store/main.actions";
import {ModalController} from "@ionic/angular";
import {QuizResultComponent} from "src/app/quiz/quiz-result/quiz-result.component";
import {RouterService} from "src/app/+store/router.service";

export enum CLICK_STATE {
    VALIDATE,
    NEXT
}

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss']
})
export class QuizPage implements OnInit {

    @Select(MainState.game)
    game$: Observable<Game>;

    clicked: number = 0;

    constructor(public actions$: Actions, public modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.actions$.pipe(
            ofActionDispatched(UpdateGameOver)
        ).subscribe((action: UpdateGameOver) => {
            this.handleQuizGameOver();
        })
    }

    async handleQuizGameOver() {
        let resultModal = await this.modalCtrl.create({
            component: QuizResultComponent
        });
        return await resultModal.present().then((r) => {
            console.log(r)
/*
            GameService.startGame(type);
            GameService.updateCard();
            RouterService.navigate(['/quiz']);

 */
        });
    }

    handleQuizQuestionResult(result: boolean): void {
        switch (this.clicked) {
            case CLICK_STATE.VALIDATE:
                this.clicked = CLICK_STATE.NEXT;
                result ? GameService.handleCorrectAnswer() : GameService.handleWrongAnswer();
                break;
            case CLICK_STATE.NEXT:
                this.clicked = CLICK_STATE.VALIDATE;
                GameService.updateCard();
                break;
        }
    }

}
