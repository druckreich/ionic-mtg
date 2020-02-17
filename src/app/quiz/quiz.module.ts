import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {QuizPage} from './quiz.page';
import {QuizArtComponent} from './quiz-art/quiz-art.component';
import {QUIZ_QUESTIONS, QuizQuestionsComponent} from './quiz-questions/quiz-questions.component';
import {QuizQuestionAnchorDirective} from './quiz-questions/quiz-question-anchor.directive';
import {QuizService} from "./quiz.service";

const routes: Routes = [
    {
        path: '',
        component: QuizPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    declarations: [
        QuizPage,
        QuizArtComponent,
        QuizQuestionsComponent,
        QuizQuestionAnchorDirective,
        QUIZ_QUESTIONS
    ],
    providers: [
        QuizService
    ],
    entryComponents: [
        QuizArtComponent,
        QuizQuestionsComponent,
        QUIZ_QUESTIONS
    ]
})
export class QuizPageModule {
}
