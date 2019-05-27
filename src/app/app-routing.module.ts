import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: 'cards', loadChildren: './card-list/card-list.module#CardListPageModule'},
    {path: 'cards/:id', loadChildren: './card-details/card-details.module#CardDetailsPageModule'},
    {path: '**', pathMatch: 'full', redirectTo: 'cards'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
