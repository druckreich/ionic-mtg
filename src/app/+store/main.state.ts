import {Action, Selector, State, StateContext} from '@ngxs/store';
import {GetCards, GetSets, GetSubtypes, GetSupertypes, GetTypes, SetFavourite} from './main.actions';
import {MainService} from './main.service';
import {tap} from 'rxjs/operators';
import {normalize, schema} from 'normalizr';
import {of} from 'rxjs';
import {Card, Set} from 'mtgsdk-ts';

export interface Schema {
    entities: {
        [key: string]: {}
    };
    result: any[];
}

export interface MainStateModel {
    cards: Card[];
    sets: Set[];
    types: string[];
    subtypes: string[];
    supertypes: string[];
}

@State<MainStateModel>({
    name: 'mtg',
    defaults: {
        cards: [],
        sets: [],
        types: [],
        subtypes: [],
        supertypes: [],
    }
})

export class MainState {

    @Selector()
    public static getCards(state: MainStateModel) {
        return state.cards;
    }

    constructor(public mainService: MainService) {

    }

    @Action(GetCards)
    getCards(ctx: StateContext<MainStateModel>, {searchParams}: GetCards) {
        return this.mainService.getCards(searchParams).pipe(
            tap((data: any) => {
                ctx.setState({
                    ...ctx.getState(),
                    cards: data.cards
                });
            })
        );
    }

    @Action(GetSets)
    getSets(ctx: StateContext<MainStateModel>) {
        if (ctx.getState().sets && ctx.getState().sets.length > 0) {
            return of(ctx.getState());
        } else {
            return this.mainService.getSets().pipe(
                tap((data: any) => {
                    ctx.patchState({
                        sets: data.sets
                    });
                })
            );
        }
    }

    @Action(GetTypes)
    getTypes(ctx: StateContext<MainStateModel>) {
        if (ctx.getState().types && ctx.getState().types.length > 0) {
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
        if (ctx.getState().subtypes && ctx.getState().subtypes.length > 0) {
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
        if (ctx.getState().supertypes && ctx.getState().supertypes.length > 0) {
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
}
