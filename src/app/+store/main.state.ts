import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
    PrepareData,
    PrepareDataSuccess,
    UpdateGame,
    UpdateGameCorrectAnswer, UpdateGameOver,
    UpdateGameQuestion,
    UpdateGameRandomCard,
    UpdateGameWrongAnswer
} from './main.actions';
import {MainService} from './main.service';
import {tap} from 'rxjs/operators';
import {Card} from './card.model';
import {patch} from '@ngxs/store/operators';
import {Game} from "./game.model";
import {getRandomElementsFrom} from "src/app/shared/util";
import {Record} from "src/app/+store/record.model";
import {ModalController} from "@ionic/angular";

export const CMC = ['1', '2', '3', '4', '5', '6', '7', '8+'];
export const COLOR = ['W', 'U', 'B', 'R', 'G'];
export const TYPE = ['Artifact', 'Creature', 'Enchantment', 'Instant', 'Sorcery'];
export const RARITY = ['Common', 'Uncommon', 'Rare', 'Mythic'];

export interface MainStateModel {
    cards: Card[];
    game: Game;
    record: Record;
}

@State<MainStateModel>({
    name: 'mtg',
    defaults: {
        cards: [],
        game: {
            type: "",
            state: null,
            card: null,
            question: "",
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


    @Selector()
    public static cards(state: MainStateModel): Card[] {
        return state.cards;
    }

    @Selector()
    public static game(state: MainStateModel): Game {
        return state.game;
    }

    @Selector()
    public static record(state: MainStateModel): Record {
        return state.record;
    }

    constructor(public mainService: MainService) {
    }

    @Action(PrepareData)
    prepareData({getState, setState, dispatch}: StateContext<MainStateModel>) {
        const cards: Card[] = getState().cards;
        if (cards.length == 0) {
            this.mainService.prepareCards().pipe(
                tap((cards: Card[]) => {
                    setState(
                        patch(<MainStateModel>{
                            cards: cards
                        }));
                })
            );
        } else {
            dispatch(new PrepareDataSuccess());
        }
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
    updateGameRandomCard({dispatch, getState, setState}: StateContext<MainStateModel>) {

        if(getState().game.lives <= 0) {
            dispatch(new UpdateGameOver());
            return;
        }

        const game: any = getState().game;
        const allCards: Card[] = getState().cards;
        const gameCards: Card[] = allCards.filter((c: Card) => {
            return c.legalities[game.type] === 'legal';
        });
        const cards: Card[] = getRandomElementsFrom(gameCards, 1);
        setState(patch({
                game: patch({
                    ...getState().game,
                    card: cards[0]
                })
            }
        ));
    }

    @Action(UpdateGameQuestion)
    updateGameQuestion({getState, setState}: StateContext<MainStateModel>, action: UpdateGameQuestion) {
        const game: Game = getState().game;
        setState(patch({
                game: patch({
                    ...game,
                    question: action.question
                })
            }
        ));
    }

    @Action(UpdateGameCorrectAnswer)
    updateGameCorrectAnswer({getState, setState}: StateContext<MainStateModel>) {
        const game: Game = getState().game;
        setState(patch({
                game: patch({
                    ...game,
                    correctAnswers: game.correctAnswers + 1
                })
            }
        ));
    }

    @Action(UpdateGameWrongAnswer)
    updateGameWrongAnswer({getState, setState, dispatch}: StateContext<MainStateModel>) {
        const game: Game = getState().game;
        setState(patch({
                game: patch({
                    ...game,
                    lives: game.lives - 1
                })
            }
        ));
    }
}
