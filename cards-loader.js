'use strict';
var http = require('https');
var fs = require('fs');

const url = "https://archive.scryfall.com/json/scryfall-oracle-cards.json";
const path = "./src/assets/data/cards.json";

if (!fs.existsSync(path)) {
    fs.writeFileSync(path, '', function (err) {
        if (err) throw err;
    });
}

const download = function (url, dest, cb) {
    const file = fs.createWriteStream(path);
    const request = http.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            console.log('done');
            file.close();
            if (cb) cb();
        });
    }).on('error', function (err) {
        fs.unlink(dest, cb(err.message));
    });
};

const parse = function (src, dest, cb) {
    const jsonData = JSON.parse(fs.readFileSync(path, 'utf-8'));
    const arr = [];
    if (jsonData) {
        for (let key in jsonData) {
            const object = jsonData[key];
            if (   object.type_line.includes('Land')
                || object.type_line.includes('Token')
                || object.type_line.includes('Card')
                || object.type_line.includes('Planeswalker')
                || object.type_line.includes('Saga')) {

            } else if (object.legalities.standard === 'not_legal' && object.legalities.modern === 'not_legal') {

            } else {
                var card = {
                    name: object.name,
                    cmc: object.cmc,
                    rarity: object.rarity,
                    legalities: {
                        "standard": object.legalities.standard,
                        "modern": object.legalities.modern
                    },
                    image_uris: {
                        art_crop: object.image_uris ? object.image_uris.art_crop : '',
                        border_crop: object.image_uris ? object.image_uris.border_crop : '',
                        small: object.image_uris ? object.image_uris.small : '',
                        normal: object.image_uris ? object.image_uris.normal : ''
                    },
                    colors: object.colors,
                    type_line: object.type_line
                }
                arr.push(card);
            }
        }
        fs.writeFileSync(path, JSON.stringify(arr));
        console.log(arr.length + ' cards written');
    }
};

download(url, path, function (err) {
    if (err) throw err;
    parse(path);
});




