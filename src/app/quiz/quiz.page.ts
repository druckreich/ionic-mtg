import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {CMC, COLOR, RARITY, TYPE} from '../+store/main.state';

import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import isEqual from 'lodash-ts/isEqual';
import {ActivatedRoute} from '@angular/router';
import {MainService} from '../+store/main.service';
import {delay, map, takeUntil} from 'rxjs/operators';
import {Card} from '../+store/card.model';
import {of, Subject} from 'rxjs';

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
        const value: string = control.value;
        return value.toLowerCase() === card.rarity.toLowerCase() ? null : {'rarity': 'invalid'};
    };
}

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.page.html',
    styleUrls: ['./quiz.page.scss']
})
export class QuizPage implements OnInit, OnDestroy {

    cards: Card[];
    cmc: string[] = CMC;
    color: string[] = COLOR;
    type: string[] = TYPE;
    rarity: string[] = RARITY;

    isQuizStarted = false;
    currentCardLoaded = false;
    showBackdrop = false;
    showBanner = false;

    results: any[];
    cardsNumber: number;
    currentCard: Card;
    cardIndex = 0;

    quizForm: FormGroup;
    destroy$: Subject<any> = new Subject();

    constructor(public store: Store, public activatedRoute: ActivatedRoute, public cd: ChangeDetectorRef, public mainService: MainService) {
    }

    ngOnInit() {
        this.isQuizStarted = false;
        this.resetFormValue();

        this.cardsNumber = +this.activatedRoute.snapshot.queryParams['cardsNumber'];
        this.mainService.getCardsData().pipe(
            takeUntil(this.destroy$),
            map((cards: Card[]) => {
                return cards.filter((card: Card) => {
                    return card.legalities.standard === 'legal';
                });
            }),
            map((cards: Card[]) => {
                return this.getRandom(cards, this.cardsNumber);
            })
        ).subscribe((cards: Card[]) => {
            this.cards = cards;
            this.startQuiz();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
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

    startQuiz() {
        this.isQuizStarted = true;
        this.cardIndex = 0;
        this.showNextCard();
    }

    stopQuiz() {
        this.isQuizStarted = false;
    }

    showNextCard() {
        if (this.cardIndex < this.cardsNumber) {
            this.showBackdrop = true;
            this.currentCardLoaded = false;
            this.currentCard = this.cards[this.cardIndex++];
        } else {
            this.stopQuiz();
        }
    }

    onQuizCardLoaded() {
        this.showBackdrop = false;
        this.currentCardLoaded = true;
        this.resetFormValue();
        this.clearFormValidators();
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
        const card = this.currentCard;
        this.quizForm.controls['cmc'].setValidators([cmcValidator(card)]);
        this.quizForm.controls['cmc'].updateValueAndValidity();

        this.quizForm.controls['color'].setValidators([colorValidator(card)]);
        this.quizForm.controls['color'].updateValueAndValidity();

        this.quizForm.controls['type'].setValidators([typeValidator(card)]);
        this.quizForm.controls['type'].updateValueAndValidity();

        this.quizForm.controls['rarity'].setValidators([rarityValidator(card)]);
        this.quizForm.controls['rarity'].updateValueAndValidity();

        this.showBanner = true;
        this.presentToast().then(() => {
            this.showNextCard();
            this.showBanner = false;
            this.cd.markForCheck();
        });
    }

    resetFormValue(): void {
        this.quizForm = new FormGroup({
            cmc: new FormControl(''),
            color: new FormControl(''),
            type: new FormControl(''),
            rarity: new FormControl('')
        });
    }

    clearFormValidators(): void {
        this.quizForm.controls['cmc'].clearValidators();
        this.quizForm.controls['color'].clearValidators();
        this.quizForm.controls['type'].clearValidators();
        this.quizForm.controls['rarity'].clearValidators();
    }

    async presentToast() {
        return of().pipe(
            delay(2000)
        ).toPromise();
    }
}
