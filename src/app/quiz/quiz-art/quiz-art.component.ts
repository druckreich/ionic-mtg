import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Card} from 'src/app/+store/card.model';
import {Observable, Observer} from 'rxjs';
import {QuizService} from "src/app/quiz/quiz.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-quiz-art',
    templateUrl: './quiz-art.component.html',
    styleUrls: ['./quiz-art.component.scss'],
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({opacity: 0}),
                    animate('500ms', style({opacity: 1}))
                ]),
                transition(':leave', [
                    style({opacity: 1}),
                    animate('500ms', style({opacity: 0}))
                ])
            ]
        )]
})
export class QuizArtComponent implements OnInit, OnChanges {

    @Input()
    card: Card;

    @Output()
    loaded: EventEmitter<boolean> = new EventEmitter<boolean>();

    base64Image: string;

    constructor(public quizService: QuizService) {

    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['card'].currentValue) {
            this.base64Image = '';
            const imageUrl: string = changes['card'].currentValue.image_uris.art_crop;
            this.loaded.emit(false);
            this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
                this.base64Image = 'data:image/jpg;base64,' + base64data;
                this.loaded.emit(true);
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
