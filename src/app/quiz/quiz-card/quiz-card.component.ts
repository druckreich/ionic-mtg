import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Game} from "src/app/+store/game.model";
import {COLOR} from "src/app/+store/main.state";
import {RouterService} from "src/app/+store/router.service";

@Component({
    selector: 'app-quiz-card',
    templateUrl: './quiz-card.component.html',
    styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent implements OnInit {

    @Input()
    game: Game;

    @Output()
    result: EventEmitter<boolean> = new EventEmitter<boolean>();

    isCardArtLoaded: boolean = false;
    quizQuestion: string;

    constructor() {
    }

    ngOnInit() {
        if (!this.game.card) {
            RouterService.navigate(['/home']);
        }
    }

    handleQuizQuestionResult(result: boolean) {
        this.result.emit(result);
    }

    getManaSymbols(): string[] {
        return [...COLOR].slice(5 - this.game.lives, 5);
    }
}
