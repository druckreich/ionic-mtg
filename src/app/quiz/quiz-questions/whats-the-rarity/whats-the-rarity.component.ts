import {Component, Input, OnInit} from '@angular/core';
import {Answer, QuizQuestion} from 'src/app/quiz/quiz-questions/quiz-question.model';
import {Card} from 'src/app/+store/card.model';
import {RARITY} from 'src/app/+store/main.state';
import {QuizService} from "src/app/quiz/quiz.service";
import {quizQuestionTrigger} from "src/app/quiz/quiz-questions/animations";
import {cardValueToAnswer} from "src/app/shared/util";
import {QuizQuestionBaseComponent} from "src/app/quiz/quiz-questions/quiz-question-base/quiz-question-base.component";

@Component({
    selector: 'app-whats-the-rarity',
    templateUrl: './whats-the-rarity.component.html',
    styleUrls: ['./whats-the-rarity.component.scss'],
    animations: [quizQuestionTrigger]
})
export class WhatsTheRarityComponent extends QuizQuestionBaseComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;
    question: string = "Wie selten ist diese Karte?";
    answers: Answer[];
    defaultState: string = 'default';
    showSolution = false;

    constructor(public quizService: QuizService) {
        super(quizService);
    }

    ngOnInit() {
        this.prepare();
    }

    prepare(): void {
        this.answers = RARITY.map((rarity: string) => {
            let correct: boolean = this.card.rarity.toLowerCase() === rarity.toLowerCase();
            return cardValueToAnswer(rarity, correct);
        });
    }

    selectAnswer(answer: Answer): void {
        this.answers.forEach((answer: Answer) => answer.selected = false);
        answer.selected = true;
    }

    validate(): void {
        super.validate();
    }
}
