import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CardListPage } from './card-list.page';
import {CardComponent} from './card/card.component';

const routes: Routes = [
  {
    path: '',
    component: CardListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
    declarations: [CardListPage, CardComponent]
})
export class CardListPageModule {}
