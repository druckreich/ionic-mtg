import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Card} from './card.model';
import {Observable} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    cards$: Observable<Card[]> = this.http.get<Card[]>('../assets/data/cards.json').pipe(
        tap(() => console.log('CARDS LOADED')),
        shareReplay(1)
    );

    constructor(private http: HttpClient) {

    }

    getRandomCards(n: number): Observable<Card[]> {
        return this.cards$.pipe(
            map((cards: Card[]) => this.randomCards(cards, n)),
            map((cards: Card[]) => this.prepareCards(cards))
        );
    }

    private randomCards(cards: Card[], n: number): Card[] {
        const result = new Array(n);
        const taken = new Array(cards.length);
        let len = cards.length;
        if (n > len) {
            throw new RangeError('getRandom: more elements taken than available');
        }
        while (n--) {
            let x = Math.floor(Math.random() * len);
            x = x in taken ? taken[x] : x;
            result[n] = {...cards[x]};
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
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
}
