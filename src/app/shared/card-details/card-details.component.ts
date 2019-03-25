import {Component, Input, OnInit} from '@angular/core';
import {MTGCard} from '../../+store/main.model';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SetFavourite} from '../../+store/main.actions';

@Component({
    selector: 'app-card-details',
    templateUrl: './card-details.component.html',
    styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {

    @Input()
    card: MTGCard;

    class$: Observable<string> = this.store.select(s => s.main.favourites).pipe(
        map((cards: MTGCard[]) => {
            if (cards && cards.find((card: MTGCard) => card.id === this.card.id)) {
                return 'favourite';
            }
            return 'no-favourite';
        })
    );

    constructor(public store: Store) {
    }

    ngOnInit() {
    }

    setFavourite(card) {
        this.store.dispatch(new SetFavourite(card));
    }
}
