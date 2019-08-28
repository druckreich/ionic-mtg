import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    startingQuiz = false;

    constructor(public store: Store) {
    }

    ngOnInit() {

    }

    startQuiz() {
        this.store.dispatch(new Navigate(['/quiz']));
    }

}
