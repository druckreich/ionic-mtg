import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {LoadCards, LoadSets} from '../+store/main.actions';
import {Schema} from '../+store/main.state';
import {KeyValue} from '@angular/common';
import {MTGCard} from '../+store/main.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.page.html',
    styleUrls: ['./card-list.page.scss'],
})
export class CardListPage implements OnInit {

    cards$: Observable<Schema> = this.store.select(s => s.mtg.cards);

    sortByName = (a: KeyValue<number, MTGCard>, b: KeyValue<number, MTGCard>): number => {
        return a.value.name.localeCompare(b.value.name);
    };

    constructor(public store: Store, public router: Router) {
    }

    ngOnInit() {
        this.store.dispatch(new LoadSets());
        this.store.dispatch(new LoadCards({}));
    }

    showCardDetails(card: MTGCard): void {
        this.router.navigate(['cards', card.id]);
    }


}
