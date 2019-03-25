import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'sets',
        children: [
          {
            path: '',
            loadChildren: '../tab-sets/tab-sets.module#TabSetsPageModule'
          }
        ]
      },
      {
        path: 'cards',
        children: [
          {
            path: '',
            loadChildren: '../tab-cards/tab-cards.module#TabCardsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/cards',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/cards',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
