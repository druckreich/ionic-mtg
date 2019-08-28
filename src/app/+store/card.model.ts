export class Card {
    id: string;
    name: string;
    cmc: string;
    rarity: string;
    legalities: {
        [format: string]: any
    };
    image_uris: {
        small: string;
        normal: string;
        large: string;
        png: string;
        art_crop: string;
        border_crop: string;
    };
    colors: string[];
    type_line: string;
    types: string[];
}
