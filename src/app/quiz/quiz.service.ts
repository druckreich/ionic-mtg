import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable()
export class QuizService {

    private cardLoaded$: Subject<boolean> = new Subject<boolean>();
    public isCardLoaded$: Observable<boolean> = this.cardLoaded$.asObservable();
    private answer: Subject<boolean> = new Subject();

    cardLoaded(value: boolean): void {
        this.cardLoaded$.next(value);
    }

    emitAnswer(result: boolean): void {
        this.answer.next(result);
    }

    getAnswer(): Subject<boolean> {
        return this.answer;
    }
}
