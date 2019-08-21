import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    constructor(public http: HttpClient) {

    }

    getCardsData() {
        return this.http.get("../assets/data/cards.json");
    }
}
