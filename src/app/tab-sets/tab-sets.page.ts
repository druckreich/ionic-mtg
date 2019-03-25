import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MTGCard, MTGSet} from '../+store/main.model';
import {Select, Store} from '@ngxs/store';
import {map, tap} from 'rxjs/operators';
import {LoadCards} from '../+store/main.actions';
import {MainState} from '../+store/main.state';

@Component({
    selector: 'app-tab-sets',
    templateUrl: './tab-sets.page.html',
    styleUrls: ['./tab-sets.page.scss'],
})
export class TabSetsPage implements OnInit {

    @Select(MainState.setsSortedByReleaseDate)
    sortedSets$: Observable<MTGSet[]>;

    cards$: Observable<MTGCard[]> = this.store.select(s => s.main.cards);

    constructor(public store: Store) {
    }

    ngOnInit() {
        this.sortedSets$.pipe(
            map((sets: MTGSet[]) => sets ? sets[0] : null),
            tap((set: MTGSet) => {
                if (set) {
                    this.store.dispatch(new LoadCards({set: set.code}));
                }
            })
        ).subscribe();
    }

}
