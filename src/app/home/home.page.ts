import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {PrepareGame} from "../+store/main.actions";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(public store: Store) {
    }

    ngOnInit() {

    }

    startQuiz(type: string) {
        this.store.dispatch(new PrepareGame(type)).subscribe(() => {
            this.store.dispatch(new Navigate(['/quiz']));
        });
    }

}
