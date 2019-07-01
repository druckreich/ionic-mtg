import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {GetSets, GetSubtypes, GetSupertypes, GetTypes} from './+store/main.actions';
import {Store} from '@ngxs/store';

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
        this.store.dispatch(new GetSets());
        this.store.dispatch(new GetTypes());
        this.store.dispatch(new GetSubtypes());
        this.store.dispatch(new GetSupertypes());
    }
}
