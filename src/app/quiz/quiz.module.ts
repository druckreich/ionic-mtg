import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {QuizPage} from './quiz.page';
import {QuizCardComponent} from './quiz-card/quiz-card.component';
import {BannerComponent} from './banner/banner.component';
import {QuizQuestionsComponent} from './quiz-questions/quiz-questions.component';
import {QuizQuestionAnchorDirective} from './quiz-questions/quiz-question-anchor.directive';
import {WhatsTheNameComponent} from './quiz-questions/whats-the-name/whats-the-name.component';
import {QuizQuestionService} from './quiz-questions/quiz-question.service';
import {WhatsTheColorComponent} from './quiz-questions/whats-the-color/whats-the-color.component';

const questions: any[] = [
    WhatsTheNameComponent,
    WhatsTheColorComponent
];

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
        ...questions
    ],
    providers: [
        QuizQuestionService
    ],
    entryComponents: [
        QuizCardComponent,
        QuizQuestionsComponent,
        ...questions
    ]
})
export class QuizPageModule {
}
