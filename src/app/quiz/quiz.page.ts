import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {CMC, COLOR, MainState, RARITY, TYPE} from '../+store/main.state';
import {Card} from 'mtgsdk-ts';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import isEqual from 'lodash-ts/isEqual';
import {ModalController} from '@ionic/angular';
import {QuizCardComponent} from './quiz-card/quiz-card.component';

export function cmcValidator(card: Card): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        return ((value === '8+' && card.cmc >= 8) || +value === card.cmc) ? null : {'cmc': 'invalid'};
    };
}

export function colorValidator(card: Card): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value === '' ? [] : control.value.split('|');
        return isEqual(value, card.colors) ? null : {'color': 'invalid'};
    };
}

export function typeValidator(card: Card): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value === '' ? [] : control.value.split('|');
        return isEqual(value, card.types) ? null : {'type': 'invalid'};
    };
}

export function rarityValidator(card: Card): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        return value === card.rarity ? null : {'rarity': 'invalid'};
    };
}

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

    cmc: string[] = CMC;
    color: string[] = COLOR;
    type: string[] = TYPE;
    rarity: string[] = RARITY;

    isQuizStarted = false;
    cards: Card[];
    cardIndex = 0;
    currentCard: Card;
    revealCard: boolean;

    quizForm = new FormGroup({
        cmc: new FormControl(''),
        color: new FormControl(''),
        type: new FormControl(''),
        rarity: new FormControl('')
    });

    constructor(public store: Store) {
    }

    ngOnInit() {
        this.cards = this.store.selectSnapshot(MainState.getCards);
        this.isQuizStarted = false;
        this.startQuiz();
    }

    startQuiz() {
        this.cardIndex = 0;
        this.isQuizStarted = true;
        this.showNextCard();
    }

    showNextCard() {
        this.revealCard = false;
        this.currentCard = this.cards[this.cardIndex++];
    }

    toggleOption(option: string, type: string, multiple: boolean = false) {
        const control: AbstractControl = this.quizForm.controls[type];
        if (multiple === false) {
            this.quizForm.controls[type].setValue(option);
        } else {
            const options: string[] = control.value === '' ? [] : control.value.split('|');
            const index = options.indexOf(option);
            if (index > -1) {
                options.splice(index, 1);
            } else {
                options.push(option);
            }
            this.quizForm.controls[type].setValue(options.join('|'));
        }
    }

    isOptionSelected(option: string, type: string): number {
        const control: AbstractControl = this.quizForm.controls[type];
        const options: string[] = control.value.split('|');
        return options.indexOf(option);
    }

    validateFormValue(): void {

        this.revealCard = true;

        /*
        const card = this.currentCard;
        this.quizForm.controls['cmc'].setValidators([cmcValidator(card)]);
        this.quizForm.controls['cmc'].updateValueAndValidity();

        this.quizForm.controls['color'].setValidators([colorValidator(card)]);
        this.quizForm.controls['color'].updateValueAndValidity();

        this.quizForm.controls['type'].setValidators([typeValidator(card)]);
        this.quizForm.controls['type'].updateValueAndValidity();

        this.quizForm.controls['rarity'].setValidators([rarityValidator(card)]);
        this.quizForm.controls['rarity'].updateValueAndValidity();

        if (this.quizForm.valid) {
            this.showNextCard();
        } else {
            this.quizForm.controls['cmc'].clearValidators();
            this.quizForm.controls['color'].clearValidators();
            this.quizForm.controls['type'].clearValidators();
            this.quizForm.controls['rarity'].clearValidators();
        }
         */
    }
}
