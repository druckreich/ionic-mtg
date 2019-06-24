import {Component, Input, OnInit} from '@angular/core';
import {MTGCard} from '../../+store/main.model';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    animations: [
        trigger('card', [
            state('enter', style({
                transform: 'scale(1.1)',
                boxShadow: '1px 1px 1px 1px #eee'
            })),
            state('leave', style({
                transform: 'scale(1)',
                boxShadow: 'none'

            })),
            transition('* => *', animate(300))
        ])
    ]
})
export class CardComponent implements OnInit {

    @Input()
    card: MTGCard;

    cardState = 'leave';

    constructor() {
    }

    ngOnInit() {
    }

    onMouseEnter(): void {
        this.cardState = 'enter';
        console.log('enter');
    }

    onMouseLeave(): void {
        this.cardState = 'leave';
        console.log('leave');
    }

}
