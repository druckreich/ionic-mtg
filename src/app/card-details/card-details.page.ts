import {Component, OnInit} from '@angular/core';
import {MTGCard} from '../+store/main.model';
import {Store} from '@ngxs/store';
import {ActivatedRoute} from '@angular/router';
import {Schema} from '../+store/main.state';

@Component({
    selector: 'app-card-details',
    templateUrl: './card-details.page.html',
    styleUrls: ['./card-details.page.scss'],
})
export class CardDetailsPage implements OnInit {

    card: MTGCard;

    constructor(public store: Store, public activatedRoute: ActivatedRoute) {
        const cardId: string = this.activatedRoute.snapshot.params['id'];
        const cards: Schema = this.store.selectSnapshot(s => s.mtg.cards);
        this.card = cards.entities.cards[cardId];
    }

    ngOnInit() {
    }

}
