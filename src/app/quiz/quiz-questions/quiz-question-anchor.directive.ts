import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[quiz-question-anchor]'
})
export class QuizQuestionAnchorDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
