import {Component, Input, OnInit} from '@angular/core';
import {Answer, QuizQuestion} from 'src/app/quiz/quiz-questions/quiz-question.model';
import {Card} from 'src/app/+store/card.model';
import {RARITY} from 'src/app/+store/main.state';
import {QuizService} from "src/app/quiz/quiz.service";
import {quizQuestionTrigger} from "src/app/quiz/quiz-questions/animations";
import {cardValueToAnswer} from "src/app/shared/util";

@Component({
    selector: 'app-whats-the-rarity',
    templateUrl: './whats-the-rarity.component.html',
    styleUrls: ['./whats-the-rarity.component.scss'],
    animations: [quizQuestionTrigger]
})
export class WhatsTheRarityComponent implements OnInit, QuizQuestion {

    @Input()
    card: Card;

    answers: Answer[];

    defaultState: string = 'default';

    showSolution = false;

    constructor(private quizService: QuizService) {
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
        const incorrectAnswer: Answer = this.answers.find((answer) => answer.correct !== answer.selected);
        this.quizService.emitAnswer(!incorrectAnswer);
        this.showSolution = true;
    }
}
