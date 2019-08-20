import {Component, Input, OnInit} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Card} from '../../+store/card.model';

@Component({
    selector: 'app-quiz-card',
    templateUrl: './quiz-card.component.html',
    styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent implements OnInit {

    @Input()
    card: Card;

    constructor(public http: HttpClient) {

    }

    ngOnInit() {

    }

    getArtCrop(): string {
        return this.card.image_uris.border_crop;
    }
}
