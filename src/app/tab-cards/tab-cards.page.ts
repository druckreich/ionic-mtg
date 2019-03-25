import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MTGCard} from '../+store/main.model';
import {Store} from '@ngxs/store';
import {LoadCards} from '../+store/main.actions';
import {BaseState} from '../+store/main.state';
import {FormControl, FormGroup} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {CardDetailsComponent} from '../shared/card-details/card-details.component';

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

    constructor(public store: Store, public modalController: ModalController) {
    }

    ngOnInit() {
        this.store.dispatch(new LoadCards(null));
    }

    triggerCardSearch() {
        this.store.dispatch(new LoadCards(this.searchForm.value));
    }

    async showCardDetailModal(card: MTGCard) {
        const modal = await this.modalController.create({
            component: CardDetailsComponent,
            componentProps: { card: card }
        });
        return await modal.present();
    }

}
