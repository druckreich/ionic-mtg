import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {MTGCard, MTGCardSearchParams, MTGSet} from './main.model';
import {map} from 'rxjs/operators';

@Injectable()
export class MainService {

    constructor(public httpClient: HttpClient) {

    }

    loadSets(): Observable<MTGSet[]> {
        return this.httpClient.get<MTGSet[]>(`${environment.mtgApi}/sets`);
    }

    loadCards(params: MTGCardSearchParams): Observable<MTGCard[]> {
        return this.httpClient.get<any>(`${environment.mtgApi}/cards`).pipe(
            map(data => data.cards)
        );
    }
}
