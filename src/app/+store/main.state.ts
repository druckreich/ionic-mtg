import {Action, State, StateContext} from '@ngxs/store';
import {LoadCards, LoadSets, SetFavourite} from './main.actions';
import {MainService} from './main.service';
import {tap} from 'rxjs/operators';
import {normalize, schema} from 'normalizr';
import {isEqual} from '../utils/object-utils';
import {of} from 'rxjs';

const cardSchema = new schema.Entity('cards');
const setSchema = new schema.Entity('sets', {}, {
    idAttribute: 'code'
});

export interface Schema {
    entities: {
        [key: string]: {}
    };
    result: any[];
}

export interface MainStateModel {
    cards: Schema;
    searchParams: any;
    sets: Schema;
}

@State<MainStateModel>({
    name: 'mtg',
    defaults: {
        cards: {entities: {cards: {}}, result: []},
        searchParams: {},
        sets: {entities: {sets: {}}, result: []},
    }
})

export class MainState {

    constructor(public mainService: MainService) {

    }

    @Action(LoadCards)
    loadCards(ctx: StateContext<MainStateModel>, {searchParams}: LoadCards) {
        ctx.patchState({searchParams: searchParams});
        if (ctx.getState().cards.result.length > 0 && isEqual(ctx.getState().searchParams, searchParams)) {
            return of(ctx.getState());
        } else {
            return this.mainService.loadCards(searchParams).pipe(
                tap((data: any) => {
                    ctx.patchState({
                        cards: normalize(data.cards, [cardSchema])
                    });
                })
            );

        }

    }

    @Action(LoadSets)
    loadSets(ctx: StateContext<MainStateModel>) {
        if (ctx.getState().sets.result.length > 0) {
            return of(ctx.getState());
        } else {
            return this.mainService.loadSets().pipe(
                tap((data: any) => {
                    ctx.patchState({
                        sets: normalize(data.sets, [setSchema])
                    });
                })
            );
        }
    }

    @Action(SetFavourite)
    setFavourite(ctx: StateContext<MainStateModel>, {card}: SetFavourite) {
    }
}
