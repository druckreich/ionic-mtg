import {Action, createSelector, Selector, State, StateContext} from '@ngxs/store';
import {GetData} from './main.actions';
import {MainService} from './main.service';
import {tap} from 'rxjs/operators';
import {Card} from './card.model';
import {of} from 'rxjs';

export const CMC = ['1', '2', '3', '4', '5', '6', '7', '8+'];
export const COLOR = ['B', 'G', 'U', 'W', 'R'];
export const TYPE = ['Artifact', 'Creature', 'Enchantment', 'Instant', 'Planeswalker', 'Sorcery'];
export const RARITY = ['Common', 'Uncommon', 'Rare', 'Mythic'];

export interface MainStateModel {
    data: Card[];
}

@State<MainStateModel>({
    name: 'mtg',
    defaults: {
        data: [],
    }
})

export class MainState {

    constructor(public mainService: MainService) {

    }
}
