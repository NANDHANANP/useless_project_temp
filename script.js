// ==================================================================
// THE AGGRESSIVE SPELLCHECKER
// It never fixes a single mistake. It just judges you for it,
// then rewrites your sentence into dramatic pirate poetry.
// ==================================================================


// ----------------------------------
// COMMON SPELLING MISTAKES
// Each entry carries the correction (never shown to fix anything,
// only to prove the Captain KNOWS you're wrong) and a hand-written
// couplet of scorn used when that specific word is spotted.
// ----------------------------------

const typoMap = {

    "recieve": {
        correct: "receive",
        couplet: `"Thy 'recieve' offends mine eye so keen —
A crime most foul the seas have seen!"`
    },
    "recieved": {
        correct: "received",
        couplet: `"'Recieved,' ye scrawled, with letters crossed —
The 'i' and 'e' forever lost!"`
    },
    "reciever": {
        correct: "receiver",
        couplet: `"A 'reciever' waits upon the shore,
Spelled wrong today as ne'er before!"`
    },
    "definately": {
        correct: "definitely",
        couplet: `"'Definately' — nay, there is no doubt,
The letters in yer word are out!"`
    },
    "seperate": {
        correct: "separate",
        couplet: `"Ye wrote 'seperate,' torn in twain —
An 'a' replaced an 'e' in vain!"`
    },
    "tomorow": {
        correct: "tomorrow",
        couplet: `"'Tomorow' comes with just one 'r' —
Ye've sunk one letter 'neath the tar!"`
    },
    "occured": {
        correct: "occurred",
        couplet: `"An event 'occured,' so ye claim,
But one lone 'r' has missed its aim!"`
    },
    "untill": {
        correct: "until",
        couplet: `"Ye wrote 'untill' with letters spare —
One 'l' too many haunts the air!"`
    },
    "becuase": {
        correct: "because",
        couplet: `"'Becuase' — the letters lost their place,
A jumbled word, a sailor's disgrace!"`
    },
    "adress": {
        correct: "address",
        couplet: `"One 'd' shall not an 'adress' make —
Ye've left a letter at the stake!"`
    },
    "goverment": {
        correct: "government",
        couplet: `"'Goverment' lacks its middle 'n' —
Deserted like a mutinous men!"`
    },
    "enviroment": {
        correct: "environment",
        couplet: `"'Enviroment,' missing an 'n' —
A word marooned, again, again!"`
    },
    "accomodate": {
        correct: "accommodate",
        couplet: `"'Accomodate' wants one more 'm' —
Ye've shorted it, ye landlubber-hem!"`
    },
    "embarass": {
        correct: "embarrass",
        couplet: `"'Embarass' needs another 'r' —
Yer spelling's the embarrassment, by far!"`
    },
    "wierd": {
        correct: "weird",
        couplet: `"'I before E,' the old rule cried —
Ye wrote it 'wierd,' and rules defied!"`
    },
    "thier": {
        correct: "their",
        couplet: `"'Thier' be twisted, plain to see —
The 'i' and 'e' have switched at sea!"`
    },
    "freind": {
        correct: "friend",
        couplet: `"A 'freind' indeed is hard to trust,
When letters swap themselves to dust!"`
    },
    "begining": {
        correct: "beginning",
        couplet: `"At the 'begining' — nay, too few 'n's —
Yer word's as thin as sailor's grins!"`
    },
    "sucess": {
        correct: "success",
        couplet: `"'Sucess' lacks one 'c,' I fear —
No victory for spelling here!"`
    },
    "calender": {
        correct: "calendar",
        couplet: `"A 'calender' irons out a shirt —
'Tis not the date-book in the dirt!"`
    },
    "langauge": {
        correct: "language",
        couplet: `"Yer 'langauge' twists its letters round —
The 'u' and 'a' have run aground!"`
    },
    "beleive": {
        correct: "believe",
        couplet: `"Ye wrote 'beleive' — hard to trust,
When 'i' and 'e' have turned to rust!"`
    },
    "alot": {
        correct: "a lot",
        couplet: `"There be no word so named 'alot' —
Two words torn down to one sad blot!"`
    },
    "definitly": {
        correct: "definitely",
        couplet: `"'Definitly' — short a letter's due,
The 'e' abandoned ship on you!"`
    },
    "existance": {
        correct: "existence",
        couplet: `"Yer 'existance' ends in 'a' —
'Tis 'ence,' not 'ance,' Captain's law!"`
    }

};


// ----------------------------------
// PIRATE POEMS (used for the closing stanza)
// ----------------------------------

const poems = [

`"O cursed word upon the page,
Ye spelling error of the age!
The seas grow dark, the parrots flee,
For what ye typed hath offended me!"`,

`"By moonlit mast and salty foam,
Ye've misspelled words while sailing home.
No correction shall I provide today—
I'll merely rhyme and sail away!"`,

`"ARRR! A typo walks the deck tonight,
A grammatical creature of terrible might.
Keep thy mistake exactly as it be,
For fixing it would be far too useful for me!"`,

`"From port to port the rumor spreads,
That spelling troubles fill your head.
The word is wrong, the proof is clear—
Now hear my poem, ye typing buccaneer!"`

];


// ----------------------------------
// PIRATE-SPEAK TRANSLATION MAP
// Used to mangle the ENTIRE sentence into pirate dialect,
// regardless of whether it was spelled correctly. Uselessness
// must be applied evenly.
// ----------------------------------

const pirateWordMap = {
    "you": "ye", "your": "yer", "yours": "yers", "you're": "ye be",
    "are": "be", "is": "be", "am": "be", "my": "me", "i'm": "I be",
    "hello": "ahoy", "hi": "ahoy", "friend": "matey", "friends": "mateys",
    "yes": "aye", "no": "nay", "stop": "avast", "money": "doubloons",
    "drink": "grog", "food": "grub", "before": "afore", "old": "auld",
    "very": "mighty", "man": "matey", "woman": "lass", "sir": "cap'n",
    "hey": "arrr", "okay": "aye-aye", "ok": "aye-aye", "girl": "lass",
    "boy": "lad", "here": "'ere", "there": "yonder", "over": "o'er",
    "listen": "lend an ear", "wow": "shiver me timbers", "please": "if it please the crew"
};


// ----------------------------------
// TOTAL TYPOS (persisted)
// ----------------------------------

let totalTypos =
    Number(localStorage.getItem("aggressiveTypos")) || 0;


// ----------------------------------
// FIND SPELLING MISTAKES
// Returns the unique misspelled words IN THE ORDER they first
// appear, so the poem reads in the same order as the crime scene.
// ----------------------------------

function findMistakes(text) {

    const words =
        text.toLowerCase().match(/[a-z']+/g) || [];

    const seen = new Set();
    const mistakes = [];

    for (const word of words) {
        if (typoMap[word] && !seen.has(word)) {
            seen.add(word);
            mistakes.push(word);
        }
    }

    return mistakes;
}


// ----------------------------------
// RANK SYSTEM
// ----------------------------------

function getRank(number) {

    if (number >= 100) {
        return "Grammar's Nemesis";
    }
    else if (number >= 50) {
        return "Wanted by Grammar";
    }
    else if (number >= 25) {
        return "Captain Typo";
    }
    else if (number >= 10) {
        return "Deckhand";
    }
    else {
        return "Apprentice";
    }
}


// ----------------------------------
// PIRATE-IFY A SENTENCE
// Whole-word, case-insensitive swap using pirateWordMap. This runs
// on every submission, mistakes or not, because the Captain refuses
// to let plain English pass unmolested.
// ----------------------------------

function piratifyText(text) {

    return text.replace(/[A-Za-z']+/g, function(word) {

        const lower = word.toLowerCase();
        const swap = pirateWordMap[lower];

        if (!swap) {
            return word;
        }

        // Preserve a capital first letter, since even a parrot
        // deserves proper sentence case.
        if (word[0] === word[0].toUpperCase()) {
            return swap.charAt(0).toUpperCase() + swap.slice(1);
        }

        return swap;
    });
}


// ----------------------------------
// COMPOSE THE DRAMATIC PIRATE POEM
// Builds an opening line, one couplet of scorn PER misspelled word
// (capped so the page doesn't sink under its own verse), and a
// closing stanza pulled from the general poem bank. Nothing in
// here ever corrects anything. That is the entire point.
// ----------------------------------

const MAX_COUPLETS = 3;

function composePoem(mistakes) {

    const openings = [
        `"Avast! I've read what ye have penned,"`,
        `"Hark! Yer letters make no sense,"`,
        `"By Blackbeard's beard, I've seen the crime,"`,
        `"The Captain squints, and reads again,"`
    ];

    const opening =
        openings[Math.floor(Math.random() * openings.length)];

    const couplets = mistakes
        .slice(0, MAX_COUPLETS)
        .map(word => typoMap[word].couplet);

    let overflowLine = "";

    if (mistakes.length > MAX_COUPLETS) {
        const extra = mistakes.length - MAX_COUPLETS;
        overflowLine =
            `\n\n"And ${extra} crime${extra > 1 ? "s" : ""} more I shall not name —\n` +
            `Me quill has tired of yer shame!"`;
    }

    const closing =
        poems[Math.floor(Math.random() * poems.length)];

    return [opening, ...couplets].join("\n\n") + overflowLine + "\n\n" + closing;
}


// ----------------------------------
// ATTACK SPELLING
// ----------------------------------

function attackSpelling() {

    const text =
        document.getElementById("editor").value.trim();


    // Nothing entered

    if (text === "") {

        document.getElementById("verdict").innerText =
            "You gave me nothing to judge. Coward.";

        document.getElementById("poem").innerText = "";

        document.getElementById("translation").innerText =
            "Nothing to translate. Nothing to judge. Nothing to see.";

        return;
    }


    // Find mistakes

    const mistakes = findMistakes(text);


    // ----------------------------------
    // IF THERE ARE NO MISTAKES
    // ----------------------------------

    if (mistakes.length === 0) {

        document.getElementById("verdict").innerText =
            "Suspiciously correct. I don't trust you.";

        document.getElementById("poem").innerText =

`"Not one typo upon this page,
Yet somehow still I feel the rage.
Your spelling stands annoyingly true—
I shall invent a problem just for you!"`;

    }


    // ----------------------------------
    // IF MISTAKES EXIST
    // ----------------------------------

    else {

        totalTypos += mistakes.length;

        localStorage.setItem("aggressiveTypos", totalTypos);

        document.getElementById("verdict").innerText =

            "ARRR! " +
            mistakes.length +
            " spelling crime" +
            (mistakes.length > 1 ? "s" : "") +
            " detected! And NO, I will not fix them.";

        document.getElementById("poem").innerText =
            composePoem(mistakes);
    }


    // ----------------------------------
    // PIRATE TRANSLATION (always runs — correct or not)
    // ----------------------------------

    document.getElementById("translation").innerText =
        piratifyText(text);


    // ----------------------------------
    // UPDATE STATISTICS
    // ----------------------------------

    document.getElementById("typoCount").innerText =
        totalTypos;

    const anger =
        Math.min(100, totalTypos * 7);

    document.getElementById("anger").innerText =
        anger + "%";

    document.getElementById("rank").innerText =
        getRank(totalTypos);


    // ----------------------------------
    // DISPLAY MISTAKES
    // ----------------------------------

    if (mistakes.length > 0) {

        document.getElementById("mistakes").innerHTML =

            mistakes.map(function(word) {

                return `
                    <span class="mistake" title="Yes, I know it's wrong. No, I will not tell you why.">
                        ${word}
                    </span>
                `;

            }).join("");

    }
    else {

        document.getElementById("mistakes").innerText =
            "No obvious crimes detected. How disappointing.";

    }


    // ----------------------------------
    // SHOW ORIGINAL TEXT
    // ----------------------------------

    document.getElementById("original").innerText =
        text;

}


// ----------------------------------
// CLEAR BUTTON
// ----------------------------------

function clearText() {

    document.getElementById("editor").value = "";

    document.getElementById("verdict").innerText =
        "Your spelling shall be judged here.";

    document.getElementById("poem").innerText = "";

    document.getElementById("mistakes").innerText =
        "No crimes detected yet.";

    document.getElementById("original").innerText =
        "Nothing to report.";

    document.getElementById("translation").innerText =
        "Nothing to translate yet.";

}


// ----------------------------------
// LOAD SAVED STATISTICS
// ----------------------------------

document.getElementById("typoCount").innerText =
    totalTypos;

document.getElementById("anger").innerText =
    Math.min(100, totalTypos * 7) + "%";

document.getElementById("rank").innerText =
    getRank(totalTypos);
