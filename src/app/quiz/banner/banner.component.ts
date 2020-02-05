import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Card} from '../../+store/card.model';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {

    @Input()
    card: Card;

    constructor(public modalController: ModalController) {
    }

    ngOnInit() {
    }

    handleNext(): void {
        this.modalController.dismiss({
            'next': true
        });
    }
}
