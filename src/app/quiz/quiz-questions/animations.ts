import {animate, state, style, transition, trigger} from "@angular/animations";

export const quizQuestionTrigger = trigger('changeState', [
    state('default', style({
        opacity: '1'
    })),
    state('false', style({
        opacity: '0.4'
    })),
    state('true', style({
        "font-weight": "bold",
    })),
    transition('*=>*', animate('300ms')),
]);
