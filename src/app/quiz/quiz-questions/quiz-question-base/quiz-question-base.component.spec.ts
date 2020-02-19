import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {QuizQuestionBaseComponent} from './quiz-question-base.component';

describe('QuizQuestionBaseComponent', () => {
    let component: QuizQuestionBaseComponent;
    let fixture: ComponentFixture<QuizQuestionBaseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuizQuestionBaseComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(QuizQuestionBaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
