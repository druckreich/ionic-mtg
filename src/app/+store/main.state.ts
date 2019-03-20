import {Action, State, StateContext} from '@ngxs/store';
import {LoadSets} from './main.actions';
import {MainService} from './main.service';
import {tap} from 'rxjs/operators';
import {MTGSet} from './main.model';

export interface BaseState<T> {
    data: T;
    pending: boolean;
    error: boolean;
}

export interface MainStateModel {
    sets: BaseState<MTGSet[]>;
}

@State<MainStateModel>({
    name: 'main',
})

export class MainState {
    constructor(public mainService: MainService) {

    }

    @Action(LoadSets)
    loadSets({getState, patchState, setState, dispatch}: StateContext<MainStateModel>) {
        patchState({
            sets: {data: [], pending: true, error: false}
        });
        return this.mainService.loadSets().pipe(
            tap((data: MTGSet[]) => {
                setState({
                    sets: {data: data, pending: true, error: false}
                });
            })
        );
    }

}
