import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {PrepareGame} from "src/app/+store/main.actions";
import {Observable} from "rxjs";

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
        this.store.dispatch(new PrepareGame(type)).subscribe(() => {
            this.store.dispatch(new Navigate(['/quiz']));
        });
    }

}
