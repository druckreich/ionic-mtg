import {Component, Input, OnInit} from '@angular/core';
import {
  bounceInAnimation,
  bounceInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  lightSpeedInOnEnterAnimation, pulseOnEnterAnimation,
  rubberBandAnimation, rubberBandOnEnterAnimation, shakeOnEnterAnimation
} from 'angular-animations';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
    animations: [
        lightSpeedInOnEnterAnimation({duration: 250}),
        fadeOutOnLeaveAnimation(),
        rubberBandOnEnterAnimation({delay: 200}),
        pulseOnEnterAnimation({delay: 200}),
        shakeOnEnterAnimation({delay: 200})
    ]
})
export class BannerComponent implements OnInit {

    @Input()
    valid: boolean;

    text: string;

    constructor() {
    }

    ngOnInit() {
        if (this.valid === true) {
            this.text = 'WOW';
        } else {
            this.text = 'LOOSER';
        }
    }
}
