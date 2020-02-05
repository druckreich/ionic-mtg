import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {Answer} from "./quiz-questions/quiz-question.model";

@Injectable()
export class QuizService {
    private cardLoaded$: Subject<boolean> = new Subject<boolean>();
    public isCardLoaded$: Observable<boolean> = this.cardLoaded$.asObservable();

    cardLoaded(value: boolean): void {
        this.cardLoaded$.next(value);
    }

    private answer: Subject<boolean> = new Subject();

    emitAnswer(result: boolean): void {
        this.answer.next(result);
    }

    getAnswer(): Subject<boolean> {
        return this.answer;
    }
}
