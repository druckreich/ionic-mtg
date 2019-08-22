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
            map((cards: Card[]) => {
                const result = new Array(n);
                const taken = new Array(cards.length);
                let len = cards.length;
                if (n > len) {
                    throw new RangeError('getRandom: more elements taken than available');
                }
                while (n--) {
                    const x = Math.floor(Math.random() * len);
                    result[n] = cards[x in taken ? taken[x] : x];
                    taken[x] = --len in taken ? taken[len] : len;
                }
                return result;
            })
        );
    }
}
