import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {GetCards} from '../+store/main.actions';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, withLatestFrom} from 'rxjs/operators';
import {MainState} from '../+store/main.state';
import {Card} from 'mtgsdk-ts';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import isEqual from 'lodash-ts/isEqual';

export function cmcValidator(card: Card): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        return ((value === '8+' && card.cmc >= 8) || +value === card.cmc) ? null : {'cmc': 'invalid'};
    };
}

export function colorValidator(card: Card): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        return isEqual(value.split('|'), card.colors) ? null : {'color': 'invalid'};
    };
}

export function typeValidator(card: Card): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        return isEqual(value.split('|'), card.types) ? null : {'type': 'invalid'};
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

    @Select(MainState.getCards)
    cards$: Observable<Card[]>;

    cardIndex = 0;
    nextCardSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.cardIndex);
    nextCard$: Observable<Card> = this.nextCardSubject.asObservable().pipe(
        withLatestFrom(this.cards$),
        map(([index, cards]) => cards[index])
    );

    isQuizStarted = false;

    cmc: string[] = ['1', '2', '3', '4', '5', '6', '7', '8+'];
    color: string[] = ['Black', 'Green', 'Blue', 'White', 'Red'];
    type: string[] = ['Artifact', 'Creature', 'Enchantment', 'Instant', 'Planeswalker', 'Sorcery'];
    rarity: string[] = ['Common', 'Uncommon', 'Rare', 'Mythic'];

    quizForm = new FormGroup({
        cmc: new FormControl('',),
        color: new FormControl(''),
        type: new FormControl(''),
        rarity: new FormControl('')
    });

    constructor(public store: Store) {
    }

    ngOnInit() {
        this.store.dispatch(new GetCards({random: true, pageSize: 30}));
    }

    startQuiz() {
        this.cardIndex = 0;
        this.isQuizStarted = true;
    }

    nextCard() {
        this.nextCardSubject.next(++this.cardIndex);
    }

    toggleColor(c): void {
        const control: AbstractControl = this.quizForm.controls['color'];
        const colors: string[] = control.value === '' ? [] : control.value.split('|');
        const index = colors.indexOf(c);
        if (index > -1) {
            colors.splice(index, 1);
        } else {
            colors.push(c);
        }
        this.quizForm.controls['color'].setValue(colors.join('|'));
    }

    isColorSelected(c): number {
        const control: AbstractControl = this.quizForm.controls['color'];
        const colors: string[] = control.value.split('|');
        return colors.indexOf(c);
    }

    toggleType(c): void {
        const control: AbstractControl = this.quizForm.controls['type'];
        const type: string[] = control.value === '' ? [] : control.value.split('|');
        const index = type.indexOf(c);
        if (index > -1) {
            type.splice(index, 1);
        } else {
            type.push(c);
        }
        this.quizForm.controls['type'].setValue(type.join('|'));
    }

    isTypeSelected(c): number {
        const control: AbstractControl = this.quizForm.controls['type'];
        const type: string[] = control.value.split('|');
        return type.indexOf(c);
    }

    validateFormValue(card: Card): void {
        this.quizForm.controls['cmc'].setValidators([cmcValidator(card)]);
        this.quizForm.controls['cmc'].updateValueAndValidity();

        this.quizForm.controls['color'].setValidators([colorValidator(card)]);
        this.quizForm.controls['color'].updateValueAndValidity();

        this.quizForm.controls['type'].setValidators([typeValidator(card)]);
        this.quizForm.controls['type'].updateValueAndValidity();

        this.quizForm.controls['rarity'].setValidators([rarityValidator(card)]);
        this.quizForm.controls['rarity'].updateValueAndValidity();

        if(this.quizForm.valid) {
            this.nextCard();
        } else {
            this.quizForm.controls['cmc'].clearValidators();
            this.quizForm.controls['color'].clearValidators();
            this.quizForm.controls['type'].clearValidators();
            this.quizForm.controls['rarity'].clearValidators();
        }
    }
}
