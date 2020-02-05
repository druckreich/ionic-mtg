import {
    Component,
    ComponentFactoryResolver,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {Card} from '../../+store/card.model';
import {QuizQuestionAnchorDirective} from './quiz-question-anchor.directive';
import {QuizQuestion} from './quiz-question.model';
import {WhatsTheColorComponent} from './whats-the-color/whats-the-color.component';
import {WhatsTheTypeComponent} from './whats-the-type/whats-the-type.component';
import {WhatsTheNameComponent} from './whats-the-name/whats-the-name.component';
import {WhatsTheRarityComponent} from './whats-the-rarity/whats-the-rarity.component';
import {QuizService} from "../quiz.service";

export const QUIZ_QUESTIONS: any[] = [
    WhatsTheColorComponent,
    WhatsTheNameComponent,
    WhatsTheTypeComponent,
    WhatsTheRarityComponent
];

@Component({
    selector: 'app-quiz-questions',
    templateUrl: './quiz-questions.component.html',
    styleUrls: ['./quiz-questions.component.scss'],
    providers: [QuizQuestionAnchorDirective]
})
export class QuizQuestionsComponent implements OnChanges {

    @Input()
    card: Card;

    @Output()
    answer: EventEmitter<boolean> = <EventEmitter<boolean>>this.quizService.getAnswer();

    @ViewChild(QuizQuestionAnchorDirective, {static: true})
    adHost: QuizQuestionAnchorDirective;

    questionIndex = 0;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, public quizService: QuizService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['card'].currentValue) {
            this.prepareQuestion();
        }
    }

    // randomly renders one of the question components and injects the current card into the component
    prepareQuestion(): void {
        this.questionIndex = Math.floor(Math.random() * QUIZ_QUESTIONS.length);
        const currentQuestion = QUIZ_QUESTIONS[this.questionIndex];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(currentQuestion);
        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<QuizQuestion>componentRef.instance).card = this.card;
    }


}
