export class MTGSet {
    booster: string[];
    code: string;
    name: string;
    releaseDate: string;
    type: string;
}

export class MTGCardSearchParams {
    booster: string[];
    code: string;
    name: string;
    releaseDate: string;
    type: string;
}

export class MTGCard {
    id: string;
    name: string;
    manaCost: string;
    cmc: string;
    colors: string[];
    colorIdentity: string[];
    type: string;
    supertype: string[];
    types: string[];
    subtypes: string[];
    rarity: string;
    set: string;
    booster: string[];
    code: string;
    releaseDate: string;
    setName: string;
    text: string;
    artist: string;
    number: string;
    power: string;
    toughness: string;
    layout: string;
    multiverseid: number;
    imageUrl: string;
    variations: string[];
    runlings: string[];
    foregeinNames: MTGForeignName[];
    printings: string[];
    originalText: string;
    originalType: string;
    legalities: MTGLegality[];
}

export class MTGLegality {
    name: string;
    legality: string;
}

export class MTGForeignName {
    name: string;
    text: string;
    flavour: string;
    imageUrl: string;
    language: string;
    multiverseid: number;
}
