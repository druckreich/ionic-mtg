import {Component, OnInit} from '@angular/core';
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {MainState} from "src/app/+store/main.state";
import {Game} from "src/app/+store/game.model";
import {GameService} from "src/app/+store/game.service";
import {RouterService} from "src/app/+store/router.service";
import {ModalController} from "@ionic/angular";

@Component({
    selector: 'app-quiz-result',
    templateUrl: './quiz-result.component.html',
    styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent implements OnInit {

    @SelectSnapshot(MainState.game)
    game: Game;

    constructor(public modalCtrl: ModalController) {
    }

    ngOnInit() {
    }

    startQuiz(type: string) {
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    }

}
