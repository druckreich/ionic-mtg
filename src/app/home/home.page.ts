import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {GetCards} from '../+store/main.actions';
import {TYPE} from '../+store/main.state';
import {Navigate} from '@ngxs/router-plugin';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    preparingQuiz: boolean = false;

    constructor(public store: Store) {
    }

    ngOnInit() {
    }

    startQuiz(cardsNumber: number) {
        this.preparingQuiz = true;
        this.store.dispatch(new GetCards({
            types: TYPE.join('|'),
            gameFormat: 'Standard',
            contains: 'imageUrl',
            random: true,
            pageSize: cardsNumber,
        })).subscribe((c) => {
            this.store.dispatch(new Navigate(['/quiz']));
        });
    }
}
