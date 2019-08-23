import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {

    @Input()
    valid: boolean;

    text: string;

    constructor(public modalController: ModalController) {
    }

    ngOnInit() {
        if (this.valid === true) {
            this.text = 'WOW';
        } else {
            this.text = 'LOOSER';
        }
    }

    handleRestart(): void {
        this.modalController.dismiss({
            'restart': true
        });
    }
}
