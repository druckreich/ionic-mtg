import {Action, State, StateContext} from '@ngxs/store';
import {PrepareCards, PrepareGame, RandomCard} from './main.actions';
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
    type: string;
    game: Game
}

@State<MainStateModel>({
    name: 'mtg',
    defaults: {
        type: "",
        cards: [],
        game: {
            type: ""
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

    @Action(PrepareGame)
    prepareGame({setState, getState}: StateContext<MainStateModel>, action: PrepareGame) {
        setState(
            patch({
                game: patch({
                    type: action.type
                })
            }))
    }

    @Action(RandomCard)
    randomCard({setState, getState}: StateContext<MainStateModel>) {
        const game: any = getState().game;
        const allCards: Card[] = getState().cards;
        const gameCards: Card[] = allCards.filter((c: Card) => {
            return c.legalities[game.type] === 'legal';
        });
        const cards: Card[] = getRandomElementsFrom(gameCards, 1);
        setState(patch({
            game: patch({
                card: cards[0]
            })
        }));
    }

}
