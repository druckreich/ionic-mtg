import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {MTGCard, MTGSet} from './main.model';
import * as Magic from 'mtgsdk-ts';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    constructor(public httpClient: HttpClient) {

    }

    getSets(): Observable<MTGSet[]> {
        return this.httpClient.get<any>(`${environment.mtgApi}/sets`);
    }

    getTypes(): Observable<MTGSet[]> {
        return this.httpClient.get<any>(`${environment.mtgApi}/types`);
    }

    getSubtypes(): Observable<MTGSet[]> {
        return this.httpClient.get<any>(`${environment.mtgApi}/subtypes`);
    }

    getSupertypes(): Observable<MTGSet[]> {
        return this.httpClient.get<any>(`${environment.mtgApi}/supertypes`);
    }

    getCards(params: Magic.CardFilter): Observable<MTGCard[]> {
        return this.httpClient.get<any>(`${environment.mtgApi}/cards`, {params: <any>params});
    }
}
