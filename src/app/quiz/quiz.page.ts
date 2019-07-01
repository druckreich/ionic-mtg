import { Component, OnInit } from '@angular/core';
import {Store} from '@ngxs/store';
import {GetCards} from '../+store/main.actions';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  card$:

  constructor(public store: Store) { }

  ngOnInit() {
    this.startQuiz();
  }

  startQuiz() {
    this.store.dispatch(new GetCards({random: true, pageSize: 1}));
  }
}
