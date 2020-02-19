import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {PrepareData} from "./+store/main.actions";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.splashScreen.show();
        this.initializeApp();
        this.loadInitialData();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    @Dispatch()
    loadInitialData() {
        return new PrepareData();
    }
}
