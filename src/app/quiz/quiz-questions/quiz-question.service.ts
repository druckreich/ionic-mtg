import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class QuizQuestionService {

    private answer: Subject<boolean> = new Subject();

    emitAnswer(result: boolean): void {
        this.answer.next(result);
    }

    getAnswer(): Observable<boolean> {
        return this.answer.asObservable();
    }
}
