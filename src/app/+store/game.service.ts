import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {UpdateGame, UpdateGameQuestion, UpdateGameRandomCard, UpdateGameWrongAnswer} from "src/app/+store/main.actions";
import {Game} from "src/app/+store/game.model";

export class GameService {

    @Dispatch()
    public static startGame(type: string) {
        const game: Game = {type: type, question: "", card: null, state: null, correctAnswers: 0, lives: 5};
        return new UpdateGame(game);
    }

    @Dispatch()
    public static updateCard() {
        return new UpdateGameRandomCard();
    }

    @Dispatch()
    public static updateQuestion(question: string) {
        return new UpdateGameQuestion(question);
    }

    @Dispatch()
    public static handleWrongAnswer() {
        return new UpdateGameWrongAnswer();
    }

    @Dispatch()
    public static handleCorrectAnswer() {
        return new UpdateGameWrongAnswer();
    }
}
