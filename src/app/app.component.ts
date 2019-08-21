import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {GetData} from './+store/main.actions';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public store: Store
    ) {
        this.initializeApp();
        this.loadInitialData();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    loadInitialData() {
        this.store.dispatch(new GetData());
    }
}
