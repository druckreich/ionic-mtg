import {Component, Input, OnInit} from '@angular/core';
import {Card} from 'mtgsdk-ts';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-quiz-card',
    templateUrl: './quiz-card.component.html',
    styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent implements OnInit {


    @Input()
    set card(card: Card) {
        this._card = card;
        this.loadImage(card.imageUrl);
    }

    get card(): Card {
        return this._card;
    }

    _card: Card;

    constructor(public http: HttpClient) {

    }

    ngOnInit() {
    }

    loadImage(url: string): void {
        //this.http.get(url, {responseType: 'blob'}).subscribe((result) => console.log(result));
    }

    onLoading($event): void {
        console.log($event);
    }
}
