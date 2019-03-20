import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {MTGSet} from './main.model';

@Injectable()
export class MainService {

    constructor(public httpClient: HttpClient) {

    }

    loadSets(): Observable<MTGSet[]> {
        return this.httpClient.get<MTGSet[]>(`${environment.mtgApi}/sets`);
    }
}
