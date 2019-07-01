import {Action, State, StateContext} from '@ngxs/store';
import {GetCards, GetCardsSuccess, GetSets, GetSubtypes, GetSupertypes, GetTypes, SetFavourite} from './main.actions';
import {MainService} from './main.service';
import {tap} from 'rxjs/operators';
import {normalize, schema} from 'normalizr';
import {of} from 'rxjs';

// Type
// Subtype

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
    types: Schema;
    subtypes: Schema;
    supertypes: Schema;
}

@State<MainStateModel>({
    name: 'mtg',
    defaults: {
        cards: {entities: {cards: {}}, result: []},
        sets: {entities: {sets: {}}, result: []},
        types: {entities: {types: {}}, result: []},
        subtypes: {entities: {subtypes: {}}, result: []},
        supertypes: {entities: {supertypes: {}}, result: []},
    }
})

export class MainState {

    constructor(public mainService: MainService) {

    }

    @Action(GetSets)
    getSets(ctx: StateContext<MainStateModel>) {
        if (ctx.getState().sets.result.length > 0) {
            return of(ctx.getState());
        } else {
            return this.mainService.getSets().pipe(
                tap((data: any) => {
                    ctx.patchState({
                        sets: normalize(data.sets, [setSchema])
                    });
                })
            );
        }
    }

    @Action(GetTypes)
    getTypes(ctx: StateContext<MainStateModel>) {
        if (ctx.getState().types.result.length > 0) {
            return of(ctx.getState());
        } else {
            return this.mainService.getTypes().pipe(
                tap((data: any) => {
                    ctx.patchState({
                        types: data.types
                    });
                })
            );
        }
    }

    @Action(GetSubtypes)
    getSubtypes(ctx: StateContext<MainStateModel>) {
        if (ctx.getState().subtypes.result.length > 0) {
            return of(ctx.getState());
        } else {
            return this.mainService.getSubtypes().pipe(
                tap((data: any) => {
                    ctx.patchState({
                        subtypes: data.subtypes
                    });
                })
            );
        }
    }

    @Action(GetSupertypes)
    getSupertypes(ctx: StateContext<MainStateModel>) {
        if (ctx.getState().supertypes.result.length > 0) {
            return of(ctx.getState());
        } else {
            return this.mainService.getSupertypes().pipe(
                tap((data: any) => {
                    ctx.patchState({
                        supertypes: data.supertypes
                    });
                })
            );
        }
    }

    @Action(GetCards)
    getCards(ctx: StateContext<MainStateModel>, {searchParams}: GetCards) {
        return this.mainService.getCards(searchParams).pipe(
            tap((data: any) => {
                ctx.dispatch(new GetCardsSuccess( data.cards[0]));
            })
        );
    }

    @Action(SetFavourite)
    setFavourite(ctx: StateContext<MainStateModel>, {card}: SetFavourite) {
    }
}
