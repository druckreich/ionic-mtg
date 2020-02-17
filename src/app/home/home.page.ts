import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {UpdateGame} from "src/app/+store/main.actions";
import {Observable} from "rxjs";
import {Game} from "src/app/+store/game.model";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    record$: Observable<{ [format: string]: number }> = this.store.select(s => s['mtg'].record);

    constructor(public store: Store) {
    }

    ngOnInit() {

    }

    startQuiz(type: string) {
        const game: Game = {
            type: type,
            card: null,
            state: null,
            correctAnswers: 0
        };
        this.store.dispatch(new UpdateGame(game)).subscribe(() => {
            this.store.dispatch(new Navigate(['/quiz']));
        });
    }

}
