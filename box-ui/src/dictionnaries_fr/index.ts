// Adjectives
import { stringify } from 'querystring';
import { adjFemFR } from './adjectives_fem.fr';
import { adjMascFR } from './adjectives_masc.fr';
import { adjNeutralFR } from './adjectives_neutral.fr';

// Nouns
import { pluralNounsFemFR } from './pluralnouns_fem.fr';
import { pluralNounsMascFR } from './pluralnouns_masc.fr';
import { pluralNounsNeutralFR } from './pluralnouns_neutral.fr';

/**
 * French-specific function:
 * Choose the subject gender, then the associated adjectives.
 * To have exactly one way of choosing each possibility, we sould have took a random number between
 * 0 and pluralNounsFemFR.length + pluralNounsMascFR.length + pluralNounsNeutralFR.length, but the function
 * was becomming too hard to read, for not much advantages.
 */
function GenerateRandomFrenchRoomName(): string {
    const totalNumberNouns = pluralNounsFemFR.length + pluralNounsMascFR.length;

    const choosenNounId = Math.floor(Math.random() * totalNumberNouns);
    let firstAdjective = '';
    let choosenNoun = '';
    let lastAdjective = '';

    if (choosenNounId < pluralNounsFemFR.length) {
        // Feminine noun
        // Feminine + Neutral nouns
        const pluralNouns = pluralNounsFemFR.concat(pluralNounsNeutralFR);
        choosenNoun = pluralNouns[Math.floor(Math.random() * pluralNouns.length)];

        // Feminine + Neutral adjectives
        const shuffledPossibleAdjectives = adjNeutralFR.concat(adjFemFR).sort(() => 0.5 - Math.random());
        [firstAdjective, lastAdjective] = shuffledPossibleAdjectives.slice(0, 2);

        return firstAdjective.concat(choosenNoun).concat(lastAdjective);
    } else {
        // Masculine noun
        // Masculine + Neutral adjectives
        const pluralNouns = pluralNounsMascFR.concat(pluralNounsNeutralFR);
        choosenNoun = pluralNouns[Math.floor(Math.random() * pluralNouns.length)];

        // Masculine + Neutral adjectives
        const shuffledPossibleAdjectives = adjNeutralFR.concat(adjMascFR).sort(() => 0.5 - Math.random());
        [firstAdjective, lastAdjective] = shuffledPossibleAdjectives.slice(0, 2);

        return firstAdjective.concat(choosenNoun).concat(lastAdjective);
    }
}

export default GenerateRandomFrenchRoomName;
