import {
    Component,
    ComponentFactoryResolver,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {Card} from '../../+store/card.model';
import {QuizQuestionAnchorDirective} from './quiz-question-anchor.directive';
import {WhatsTheNameComponent} from './whats-the-name/whats-the-name.component';
import {QuizQuestion} from './quiz-question.model';
import {QuizQuestionService} from './quiz-question.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {WhatsTheColorComponent} from './whats-the-color/whats-the-color.component';
import {WhatsTheRarityComponent} from './whats-the-rarity/whats-the-rarity.component';


@Component({
    selector: 'app-quiz-questions',
    templateUrl: './quiz-questions.component.html',
    styleUrls: ['./quiz-questions.component.scss'],
    providers: [QuizQuestionAnchorDirective]
})
export class QuizQuestionsComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    card: Card;

    @Output()
    answer: EventEmitter<boolean> = new EventEmitter();

    @ViewChild(QuizQuestionAnchorDirective)
    adHost: QuizQuestionAnchorDirective;

    questionIndex = 0;
    questions: any[] = [
        WhatsTheNameComponent,
        WhatsTheColorComponent,
        WhatsTheRarityComponent
    ];

    destroy$: Subject<any> = new Subject();

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private quizQuestionService: QuizQuestionService) {
    }

    ngOnInit() {
        this.quizQuestionService.getAnswer()
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe((result: boolean) => {
                this.answer.emit(result);
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['card'].currentValue) {
            this.prepareQuestion();
        }
    }

    prepareQuestion(): void {
        this.questionIndex = Math.floor(Math.random() * this.questions.length);
        const currentQuestion = this.questions[this.questionIndex];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(currentQuestion);
        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<QuizQuestion>componentRef.instance).card = this.card;
    }


}
