import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {LoadCards, LoadSets} from '../+store/main.actions';
import {MainStateModel, Schema} from '../+store/main.state';

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.page.html',
    styleUrls: ['./card-list.page.scss'],
})
export class CardListPage implements OnInit {

    cards$: Observable<Schema> = this.store.select(s => s.mtg.cards);

    constructor(public store: Store) {
    }

    ngOnInit() {
        this.store.dispatch(new LoadSets());
        this.store.dispatch(new LoadCards({}));
    }

}
