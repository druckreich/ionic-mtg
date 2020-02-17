import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizArtComponent } from './quiz-art.component';

describe('QuizCardComponent', () => {
  let component: QuizArtComponent;
  let fixture: ComponentFixture<QuizArtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizArtComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
