import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {QuizPage} from './quiz.page';
import {QuizCardComponent} from './quiz-card/quiz-card.component';
import {BannerComponent} from './banner/banner.component';
import {QUIZ_QUESTIONS, QuizQuestionsComponent} from './quiz-questions/quiz-questions.component';
import {QuizQuestionAnchorDirective} from './quiz-questions/quiz-question-anchor.directive';
import {QuizService} from "./quiz.service";
import {QuizQuestionBaseComponent} from "src/app/quiz/quiz-questions/quiz-question-base/quiz-question-base.component";

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
        QuizCardComponent,
        BannerComponent,
        QuizQuestionsComponent,
        QuizQuestionAnchorDirective,
        QuizQuestionBaseComponent,
        QUIZ_QUESTIONS
    ],
    providers: [
        QuizService
    ],
    entryComponents: [
        QuizCardComponent,
        BannerComponent,
        QuizQuestionsComponent,
        QUIZ_QUESTIONS
    ]
})
export class QuizPageModule {
}
