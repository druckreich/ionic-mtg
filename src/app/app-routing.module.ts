import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: 'card-list', loadChildren: './card-list/card-list.module#CardListPageModule'},
    {path: '**', pathMatch: 'full', redirectTo: 'card-list'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
