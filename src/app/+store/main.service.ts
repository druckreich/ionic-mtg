import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Card, CardFilter, Set} from 'mtgsdk-ts';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    constructor(public http: HttpClient) {

    }

    getCardsData() {
        return this.http.get("https://archive.scryfall.com/json/scryfall-default-cards.json");
    }

    getCards(params: CardFilter): Observable<Card[]> {
        return this.http.get<any>(`${environment.mtgApi}/cards`, {params: <any>params});
    }

    getSets(): Observable<Set[]> {
        return this.http.get<any>(`${environment.mtgApi}/sets`);
    }

    getTypes(): Observable<string[]> {
        return this.http.get<any>(`${environment.mtgApi}/types`);
    }

    getSubtypes(): Observable<string[]> {
        return this.http.get<any>(`${environment.mtgApi}/subtypes`);
    }

    getSupertypes(): Observable<string[]> {
        return this.http.get<any>(`${environment.mtgApi}/supertypes`);
    }

}
