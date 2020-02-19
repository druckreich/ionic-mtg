import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {MainState} from "src/app/+store/main.state";
import {Record} from "src/app/+store/record.model";
import {GameService} from "src/app/+store/game.service";
import {RouterService} from "src/app/+store/router.service";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    @SelectSnapshot(MainState.record)
    record: Record;

    constructor() {
    }

    ngOnInit() {

    }

    startQuiz(type: string) {
        GameService.startGame(type);
        RouterService.navigate(['/quiz']);
    }
}
