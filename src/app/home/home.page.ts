import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {GetCards} from '../+store/main.actions';
import {TYPE} from '../+store/main.state';
import {Navigate} from '@ngxs/router-plugin';
import {File} from '@ionic-native/file';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    startingQuiz = false;

    constructor(public store: Store) {
    }

    ngOnInit() {
        this.download();
    }

    startQuiz(cardsNumber: number) {
        this.startingQuiz = true;
        this.store.dispatch(new GetCards({
            types: TYPE.join('|'),
            gameFormat: 'Standard',
            contains: 'imageUrl',
            random: true,
            pageSize: cardsNumber,
            layout: 'normal'
        })).subscribe((c) => {
            this.startingQuiz = false;
            this.store.dispatch(new Navigate(['/quiz']));
        });
    }

    download() {
        window.resolve(LocalFileSystem.PERSISTENT, 0, function (fs) {
            console.log('file system open: ' + fs.name);
            fs.root.getFile('bot.png', { create: true, exclusive: false }, function (fileEntry) {
                console.log('fileEntry is file? ' + fileEntry.isFile.toString());
                var oReq = new XMLHttpRequest();
                // Make sure you add the domain name to the Content-Security-Policy <meta> element.
                oReq.open("GET", "https://archive.scryfall.com/json/scryfall-default-cards.json", true);
                // Define how you want the XHR data to come back
                oReq.responseType = "blob";
                oReq.onload = function (oEvent) {
                    var blob = oReq.response; // Note: not oReq.responseText
                    if (blob) {
                        // Create a URL based on the blob, and set an <img> tag's src to it.
                        var url = window.URL.createObjectURL(blob);
                        document.getElementById('bot-img').src = url;
                        // Or read the data with a FileReader
                        var reader = new FileReader();
                        reader.addEventListener("loadend", function() {
                            // reader.result contains the contents of blob as text
                        });
                        reader.readAsText(blob);
                    } else console.error('we didnt get an XHR response!');
                };
                oReq.send(null);
            }, function (err) { console.error('error getting file! ' + err); });
        }, function (err) { console.error('error getting persistent fs! ' + err); });
    }
}
