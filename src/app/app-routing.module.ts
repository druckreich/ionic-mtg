import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: 'quiz', loadChildren: './quiz/quiz.module#QuizPageModule'},
    {path: '**', pathMatch: 'full', redirectTo: 'quiz'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
