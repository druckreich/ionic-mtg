import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Card} from './card.model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    constructor(private http: HttpClient) {

    }

    prepareCards(): Observable<Card[]> {
        return this.http.get<Card[]>('../assets/data/cards.json');
    }
}
