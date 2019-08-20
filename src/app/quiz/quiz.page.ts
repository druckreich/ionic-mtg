import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {CMC, COLOR, RARITY, TYPE} from '../+store/main.state';

import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import isEqual from 'lodash-ts/isEqual';
import {ActivatedRoute} from '@angular/router';
import {MainService} from '../+store/main.service';
import {map} from 'rxjs/operators';
import {Card} from '../+store/card.model';
import {ToastController} from '@ionic/angular';

export function cmcValidator(card: Card): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        return ((value === '8+' && +card.cmc >= 8) || +value === +card.cmc) ? null : {'cmc': 'invalid'};
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
        const split = card.type_line.split(' — ');
        const types = split[0].split(' ');
        return isEqual(value, types) ? null : {'type': 'invalid'};
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

    cards: Card[];
    cmc: string[] = CMC;
    color: string[] = COLOR;
    type: string[] = TYPE;
    rarity: string[] = RARITY;

    isQuizStarted = false;
    cardIndex = 0;
    currentCard: Card;

    showBackdrop = true;

    quizForm = new FormGroup({
        cmc: new FormControl(''),
        color: new FormControl(''),
        type: new FormControl(''),
        rarity: new FormControl('')
    });

    constructor(public store: Store, public activatedRoute: ActivatedRoute, public mainService: MainService, public toastController: ToastController) {
    }

    ngOnInit() {
        this.isQuizStarted = false;
        const cardsNumber: number = +this.activatedRoute.snapshot.queryParams['cardsNumber'];
        this.mainService.getCardsData().pipe(
            map((cards: Card[]) => {
                return cards.filter((card: Card) => {
                    return card.legalities.standard === 'legal';
                });
            }),
            map((cards: Card[]) => {
                return cards.filter((card: Card) => {
                    const types: string[] = this.getCardTypes(card);
                    if (types.indexOf('Land') !== -1 || types.indexOf('Token') !== -1) {
                        return false;
                    }
                    return true;
                });
            }),
            map((cards: Card[]) => {
                return this.getRandom(cards, cardsNumber);
            })
        ).subscribe((cards: Card[]) => {
            this.cards = cards;
            console.log(this.cards);
            this.startQuiz();
        });
    }

    getRandom(arr, n) {
        const result = new Array(n);
        let len = arr.length;
        const taken = new Array(len);
        if (n > len) {
            throw new RangeError('getRandom: more elements taken than available');
        }
        while (n--) {
            const x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    getCardTypes(card: Card): string[] {
        const types = card.type_line.split(' — ');
        return types[0].split(' ');
    }

    startQuiz() {
        this.isQuizStarted = true;
        this.cardIndex = 0;
        this.showNextCard();
    }

    showNextCard() {
        this.clearFormValidators();
        this.showBackdrop = false;
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

        this.showBackdrop = true;

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
            this.presentToast('success', 'GOOD').then(() => this.showNextCard());
        } else {
            this.presentToast('danger', 'BAD').then(() => this.showNextCard());
        }
    }

    clearFormValidators(): void {
        this.quizForm.controls['cmc'].clearValidators();
        this.quizForm.controls['color'].clearValidators();
        this.quizForm.controls['type'].clearValidators();
        this.quizForm.controls['rarity'].clearValidators();
    }

    async presentToast(type: string, message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            position: 'middle',
            color: type
        });
        return toast.present();
    }
}
