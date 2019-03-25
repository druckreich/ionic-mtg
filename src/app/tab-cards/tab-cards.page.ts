import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MTGCard} from '../+store/main.model';
import {Store} from '@ngxs/store';
import {LoadCards} from '../+store/main.actions';
import {BaseState} from '../+store/main.state';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-tab-cards',
    templateUrl: './tab-cards.page.html',
    styleUrls: ['./tab-cards.page.scss'],
})
export class TabCardsPage implements OnInit {

    cards$: Observable<BaseState<MTGCard[]>> = this.store.select(s => s.main.cards);

    searchForm: FormGroup = new FormGroup({
        'name': new FormControl('')
    });

    constructor(public store: Store) {
    }

    ngOnInit() {
        this.store.dispatch(new LoadCards(null));
    }

    triggerCardSearch() {
        this.store.dispatch(new LoadCards(this.searchForm.value));

    }

}
