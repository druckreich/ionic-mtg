import {Action, State, StateContext} from '@ngxs/store';
import {PrepareCards, PrepareGame, RandomCard} from './main.actions';
import {MainService} from './main.service';
import {tap} from 'rxjs/operators';
import {Card} from './card.model';

export const CMC = ['1', '2', '3', '4', '5', '6', '7', '8+'];
export const COLOR = ['B', 'G', 'U', 'W', 'R'];
export const TYPE = ['Artifact', 'Creature', 'Enchantment', 'Instant', 'Sorcery'];
export const RARITY = ['Common', 'Uncommon', 'Rare', 'Mythic'];

export interface MainStateModel {
    cards: Card[];
    type: string;
    game: {
        type?: string;
        card?: Card;
        randomCards?: Card[];
    }
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
    prepareCards({patchState}: StateContext<MainStateModel>) {
        return this.mainService.prepareCards().pipe(
            tap((cards: Card[]) => {
                patchState({cards: cards});
            })
        );
    }


    @Action(PrepareGame)
    prepareGame({setState, getState}: StateContext<MainStateModel>, action: PrepareGame) {
        setState({
            ...getState(),
            game: {
                ...getState().game,
                type: action.type
            }
        });
    }

    @Action(RandomCard)
    randomCard({setState, getState}: StateContext<MainStateModel>) {
        const game: any = getState().game;
        const allCards: Card[] = getState().cards;
        const gameCards: Card[] = allCards.filter((c: Card) => {
            switch (game.type) {
                case 'standard':
                    return c.legalities.standard === 'legal';
                    break;
                case 'modern':
                    return c.legalities.modern === 'legal';
                    break;
            }
        });
        const cards: Card[] = this.getRandomCards(gameCards, 10);
        setState({
            ...getState(),
            game: {
                ...getState().game,
                card: cards.shift(),
                randomCards: cards.slice()
            },
        })
    }

    private getRandomCards(arr, n) {
        const result = new Array(n);
        let len = arr.length;
        const taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }
}
