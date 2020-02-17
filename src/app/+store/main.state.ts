import {Action, State, StateContext} from '@ngxs/store';
import {
    PrepareCards,
    UpdateGame,
    UpdateGameCorrectAnswer,
    UpdateGameRandomCard,
    UpdateGameWrongAnswer
} from './main.actions';
import {MainService} from './main.service';
import {tap} from 'rxjs/operators';
import {Card} from './card.model';
import {patch} from '@ngxs/store/operators';
import {Game} from "./game.model";
import {getRandomElementsFrom} from "src/app/shared/util";

export const CMC = ['1', '2', '3', '4', '5', '6', '7', '8+'];
export const COLOR = ['W', 'U', 'B', 'R', 'G'];
export const TYPE = ['Artifact', 'Creature', 'Enchantment', 'Instant', 'Sorcery'];
export const RARITY = ['Common', 'Uncommon', 'Rare', 'Mythic'];

export interface MainStateModel {
    cards: Card[];
    record: { [format: string]: number };
    game: Game;
}

@State<MainStateModel>({
    name: 'mtg',
    defaults: {
        cards: [],
        game: {
            type: "",
            state: null,
            card: null,
            correctAnswers: 0,
            lives: 0

        },
        record: {
            standard: 0,
            modern: 0
        }

    }
})

export class MainState {


    constructor(public mainService: MainService) {
    }

    @Action(PrepareCards)
    prepareCards({setState}: StateContext<MainStateModel>) {
        return this.mainService.prepareCards().pipe(
            tap((cards: Card[]) => {
                setState(
                    patch(<MainStateModel>{
                        cards: cards
                    }));
            })
        );
    }

    @Action(UpdateGame)
    updateGame({setState, getState}: StateContext<MainStateModel>, action: UpdateGame) {
        setState(patch({
                game: patch({
                    ...getState().game,
                    ...action.game
                })
            }
        ));
    }

    @Action(UpdateGameRandomCard)
    updateGameRandomCard({getState, dispatch}: StateContext<MainStateModel>) {
        const game: any = getState().game;
        const allCards: Card[] = getState().cards;
        const gameCards: Card[] = allCards.filter((c: Card) => {
            return c.legalities[game.type] === 'legal';
        });
        const cards: Card[] = getRandomElementsFrom(gameCards, 1);
        dispatch(new UpdateGame({card: cards[0]}));
    }

    @Action(UpdateGameCorrectAnswer)
    updateGameCorrectAnswer({getState, dispatch}: StateContext<MainStateModel>) {
        const game: Game = getState().game;
        dispatch(new UpdateGame({correctAnswers: game.correctAnswers + 1}));
    }

    @Action(UpdateGameWrongAnswer)
    updateGameWrongAnswer({getState, dispatch}: StateContext<MainStateModel>) {
        const game: Game = getState().game;
        dispatch(new UpdateGame({lives: game.lives - 1}));
    }


}
