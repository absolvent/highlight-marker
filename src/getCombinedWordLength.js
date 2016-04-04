/**
 * @license Copyright (c) 2015-present, Absolvent.pl
 * For licensing, see LICENSE
 */

"use strict";

var reduce = require("lodash/reduce");

function getCombinedWordLength(combinedWord) {
    return reduce(combinedWord, function (acc, wordChunk) {
        if (wordChunk.inputValueWord) {
            return acc + wordChunk.inputValueWord.length;
        }

        return acc + wordChunk.length;
    }, 0);
}

module.exports = getCombinedWordLength;
