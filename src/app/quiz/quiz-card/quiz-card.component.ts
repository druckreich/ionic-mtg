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
    card: Card;

    @Input()
    reveal = false;

    constructor(public http: HttpClient) {

    }

    ngOnInit() {

    }

    getMaskType(): string {
        return this.card.layout;
    }
}
