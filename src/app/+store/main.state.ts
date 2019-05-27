import {Action, State, StateContext} from '@ngxs/store';
import {LoadCards, LoadSets, SetFavourite} from './main.actions';
import {MainService} from './main.service';
import {tap} from 'rxjs/operators';
import {normalize, schema} from 'normalizr';

const cardSchema = new schema.Entity('cards');
const setSchema = new schema.Entity('sets', {}, {
    idAttribute: 'code'
});

export interface Schema {
    entities: {
        [key: string]: any[]
    };
    result: any[];
}

export interface MainStateModel {
    cards: Schema;
    sets: Schema;
}

@State<MainStateModel>({
    name: 'mtg',
})

export class MainState {

    constructor(public mainService: MainService) {

    }

    @Action(LoadCards)
    loadCards({getState, patchState, setState}: StateContext<MainStateModel>, {searchParams}: LoadCards) {
        return this.mainService.loadCards(searchParams).pipe(
            tap((data: any) => {
                patchState({
                    cards: normalize(data.cards, [cardSchema])
                });
            })
        );
    }

    @Action(LoadSets)
    loadSets({getState, patchState, setState}: StateContext<MainStateModel>) {
        return this.mainService.loadSets().pipe(
            tap((data: any) => {
                patchState({
                    sets: normalize(data.sets, [setSchema])
                });
            })
        );
    }

    @Action(SetFavourite)
    setFavourite({getState, patchState, setState}: StateContext<MainStateModel>, {card}: SetFavourite) {
    }
}
