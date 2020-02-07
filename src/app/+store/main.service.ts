import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Card} from './card.model';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {Game} from "./game.model";

@Injectable({
    providedIn: 'root'
})
export class MainService {

    constructor(private http: HttpClient) {

    }

    prepareCards(): Observable<Card[]> {
        return this.http.get<Card[]>('../assets/data/cards.json');
    }

    /*

    getRandomCard(type: string): Observable<Card> {
        return this.getRandomCards(1, type).pipe(
            map((cards: Card[]) => cards[0])
        );
    }


    getRandomCards(n: number, type: string): Observable<Card[]> {
        return this.cards$.pipe(
            map((cards: Card[]) => this.randomCards(cards, n)),
            map((cards: Card[]) => this.prepareCards(cards))
        );
    }

    private prepareCards(cards: Card[]): Card[] {
        return cards.map((card: Card) => {
            const types: string[] = card.type_line.split(' — ');
            return {
                ...card,
                types: types[0].replace('Legendary', '').trim().split(' ')
            };
        });
    }
    */
}
