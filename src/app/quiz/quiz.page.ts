import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {GetCards} from '../+store/main.actions';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, withLatestFrom} from 'rxjs/operators';
import {MainState} from '../+store/main.state';
import {Card} from 'mtgsdk-ts';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

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

    quizForm = new FormGroup({
        name: new FormControl(''),
        cmc: new FormControl(''),
        color: new FormControl(''),
        type: new FormControl(''),
        rarity: new FormControl('')
    });

    cmc: string[] = ['1', '2', '3', '4', '5', '6', '7', '8+'];
    color: string[] = ['B', 'G', 'U', 'W', 'R'];
    type: string[] = ['Artifact', 'Creature', 'Enchantment', 'Instant', 'Planeswalker', 'Sorcery'];
    rarity: string[] = ['Common', 'Uncommon', 'Rare', 'Mythic'];

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
        console.log('TRIGGER');
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
}
