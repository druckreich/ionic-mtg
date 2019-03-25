import {Action, Selector, State, StateContext} from '@ngxs/store';
import {LoadCards, LoadSets, SetFavourite} from './main.actions';
import {MainService} from './main.service';
import {tap} from 'rxjs/operators';
import {MTGCard, MTGSet} from './main.model';

export interface BaseState<T> {
    data: T;
    pending: boolean;
    error: boolean;
}

export interface MainStateModel {
    sets: BaseState<MTGSet[]>;
    cards: BaseState<MTGCard[]>;
    favourites: MTGCard[];
}

@State<MainStateModel>({
    name: 'main',
})

export class MainState {

    @Selector()
    public static setsSortedByReleaseDate(state: MainStateModel) {
        return state.sets.data.sort((a: MTGSet, b: MTGSet) => {
            const aDate: Date = new Date(a.releaseDate);
            const bDate: Date = new Date(b.releaseDate);
            return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
        });
    }

    constructor(public mainService: MainService) {

    }

    @Action(LoadCards)
    loadCards({getState, patchState, setState}: StateContext<MainStateModel>, {searchParams}: LoadCards) {
        patchState({
            cards: {data: [], pending: true, error: false}
        });
        return this.mainService.loadCards(searchParams).pipe(
            tap((data: MTGCard[]) => {
                setState({
                    ...getState(),
                    cards: {data: data, pending: false, error: false}
                });
            })
        );
    }

    @Action(LoadSets)
    loadSets({getState, patchState, setState}: StateContext<MainStateModel>) {
        patchState({
            sets: {data: [], pending: true, error: false}
        });
        return this.mainService.loadSets().pipe(
            tap((data: MTGSet[]) => {
                setState({
                    ...getState(),
                    sets: {data: data, pending: false, error: false},
                });
            })
        );
    }

    @Action(SetFavourite)
    setFavourite({getState, patchState, setState}: StateContext<MainStateModel>, {card}: SetFavourite) {
        const favourites: MTGCard[] = getState().favourites ? getState().favourites : [];
        const index: number = favourites.findIndex((c: MTGCard) => c.id === card.id);
        if (index !== -1) {
            setState({
                ...getState(),
                favourites: [
                    ...favourites.slice(0, index),
                    ...favourites.slice(index + 1, favourites.length),
                ]
            });
        } else {
            setState({
                ...getState(),
                favourites: [
                    ...favourites,
                    card
                ]
            });
        }

    }

}
