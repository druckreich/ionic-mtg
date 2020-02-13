import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Card} from 'src/app/+store/card.model';
import {Observable, Observer} from 'rxjs';
import {QuizService} from "src/app/quiz/quiz.service";

@Component({
    selector: 'app-quiz-card',
    templateUrl: './quiz-card.component.html',
    styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent implements OnInit, OnChanges {

    @Input()
    card: Card;

    @Output()
    loaded: EventEmitter<any> = new EventEmitter<any>();

    base64Image: string;

    constructor(public quizService: QuizService) {

    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['card'].currentValue) {
            this.base64Image = '';
            const imageUrl: string = changes['card'].currentValue.image_uris.art_crop;
            this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
                this.base64Image = 'data:image/jpg;base64,' + base64data;
                this.quizService.cardLoaded(true);
            });
        }
    }

    getBase64ImageFromURL(url: string) {
        return Observable.create((observer: Observer<string>) => {
            // create an image object
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = url;
            if (!img.complete) {
                // This will call another method that will create image from url
                img.onload = () => {
                    observer.next(this.getBase64Image(img));
                    observer.complete();
                };
                img.onerror = (err) => {
                    observer.error(err);
                };
            } else {
                observer.next(this.getBase64Image(img));
                observer.complete();
            }
        });
    }

    getBase64Image(img: HTMLImageElement) {
        // We create a HTML canvas object that will create a 2d image
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        // This will draw image
        ctx.drawImage(img, 0, 0);
        // Convert the drawn image to Data URL
        const dataURL = canvas.toDataURL('image/png');
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
    }
}
