import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {GetCards} from '../+store/main.actions';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, withLatestFrom} from 'rxjs/operators';
import {MainState} from '../+store/main.state';
import {Card} from 'mtgsdk-ts';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import isEqual from 'lodash-ts/isEqual';


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
        cmc: new FormControl(''),
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
        const colors: string[] = control.value.split('|');
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

    validateFormValue(card: Card): void {
        const value: any = this.quizForm.value;
        if (this.validateCmc(value['cmc'], card) && this.validateColor(value['color'], card) && this.validateType(value['type'], card) && this.validateRarity(value['rarity'], card)) {
            console.log('VALID');
        } else {
            console.log('NOT_VALID');
        }
    }

    validateCmc(value: string, card: Card): boolean {
        return ((value === '8+' && card.cmc >= 8) || +value === card.cmc);
    }

    validateColor(value: string, card: Card): boolean {
        return isEqual(value, card.colors);
    }

    validateType(value: string, card: Card): boolean {
        return isEqual(value, card.types);
    }

    validateRarity(value: string, card: Card): boolean {
        return value === card.rarity;
    }

}
