import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Answer} from './quiz-question.model';

@Injectable()
export class QuizQuestionService {

    private answer: Subject<boolean> = new Subject();

    emitAnswer(result: boolean): void {
        this.answer.next(result);
    }

    getAnswer(): Observable<boolean> {
        return this.answer.asObservable();
    }

    findIndexAnswer(answers: Answer[], answer: Answer): number {
        return answers.findIndex((a: Answer) => a.value === answer.value);
    }
}
