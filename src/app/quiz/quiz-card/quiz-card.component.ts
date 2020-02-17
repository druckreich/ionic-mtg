import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from "@ngxs/store";
import {Game} from "src/app/+store/game.model";
import {QuizService} from "src/app/quiz/quiz.service";
import {UpdateGameRandomCard, UpdateGame} from "src/app/+store/main.actions";
import {COLOR} from "src/app/+store/main.state";

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

    quizQuestion: string;

    constructor(public store: Store, public quizService: QuizService) {
    }

    ngOnInit() {
        console.log(this.game);
        if (!this.game.card) {
            this.store.dispatch(new UpdateGame({lives: 5, correctAnswers: 0}));
            this.store.dispatch(new UpdateGameRandomCard());
        }
    }

    handleQuizQuestionResult(result: boolean) {
        this.result.emit(result);
    }

    getManaSymbols(): string[] {
        return [...COLOR].slice(5 - this.game.lives, 5);
    }
}
