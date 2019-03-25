import {Action, State, StateContext} from '@ngxs/store';
import {LoadCards, LoadSets} from './main.actions';
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
}

@State<MainStateModel>({
    name: 'main',
})

export class MainState {
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
}
