export class MTGSet {
    booster: string[];
    code: string;
    name: string;
    releaseDate: string;
    type: string;
}

export class MTGCardSearchParams {
    name?: string; // The card name. For split, double-faced and flip cards, just the name of one side of the card. Basically each ‘sub-card’ has its own record.
    layout?: string; // The card layout. Possible values: normal, split, flip, double-faced, token, plane, scheme, phenomenon, leveler, vanguard, aftermath
    cmc?: string; // Converted mana cost. Always a number
    colors?: string; // The card colors. Usually this is derived from the casting cost, but some cards are special (like the back of dual sided cards and Ghostfire).
    colorIdentity?: string[]; // The card colors by color code. [“Red”, “Blue”] becomes [“R”, “U”]
    type?: string; // The card type. This is the type you would see on the card if printed today. Note: The dash is a UTF8 ‘long dash’ as per the MTG rules
    supertypes?: string[]; // The supertypes of the card. These appear to the far left of the card type. Example values: Basic, Legendary, Snow, World, Ongoing
    types?: string[]; // The types of the card. These appear to the left of the dash in a card type. Example values: Instant, Sorcery, Artifact, Creature, Enchantment, Land, Planeswalker
    subtypes?: string[]; // The subtypes of the card. These appear to the right of the dash in a card type. Usually each word is its own subtype. Example values: Trap, Arcane, Equipment, Aura, Human, Rat, Squirrel, etc.
    rarity?: string; // The rarity of the card. Examples: Common, Uncommon, Rare, Mythic Rare, Special, Basic Land
    set?: string; // The set the card belongs to (set code).
    setName?: string; // The set the card belongs to.
    text?: string; // The oracle text of the card. May contain mana symbols and other symbols.
    flavor?: string; // The flavor text of the card.
    artist?: string; // The artist of the card. This may not match what is on the card as MTGJSON corrects many card misprints.
    number?: string; // The card number. This is printed at the bottom-center of the card in small text. This is a string, not an integer, because some cards have letters in their numbers.
    power?: string; // The power of the card. This is only present for creatures. This is a string, not an integer, because some cards have powers like: “1+*”
    toughness?: string; // The toughness of the card. This is only present for creatures. This is a string, not an integer, because some cards have toughness like: “1+*”
    loyalty?: string; // The loyalty of the card. This is only present for planeswalkers.
    language?: string; // The language the card is printed in. Use this parameter along with the name parameter when searching by foreignName
    gameFormat?: string; // The game format, such as Commander, Standard, Legacy, etc. (when used, legality defaults to Legal unless supplied)
    legality?: string; // The legality of the card for a given format, such as Legal, Banned or Restricted.
    page?: string; // The page of data to request
    pageSize?: string; // The amount of data to return in a single request. The default (and max) is 100.
    orderBy?: string; // The field to order by in the response results
    random?: string; // Fetch any number of cards (controlled by pageSize) randomly
    contains?: string; // Filter cards based on whether or not they have a specific field available (like imageUrl)
    id?: string; // A unique id for this card. It is made up by doing an SHA1 hash of setCode + cardName + cardImageName
    multiverseid?: string; // The multiverseid of the card on Wizard’s Gatherer web page. Cards from sets that do not exist on Gatherer will NOT have a multiverseid. Sets not on Gatherer are: ATH, ITP, DKM, RQS, DPA and all sets with a 4 letter code that starts with a lowercase ‘p’.
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
    rulings: string[];
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
