/**
 * @license Copyright (c) 2015-present, Absolvent.pl
 * For licensing, see LICENSE
 */

"use strict";

var getCombinedWordLength = require("./getCombinedWordLength"),
    reduce = require("lodash/reduce");

function overlayHighlightedWordChunkList(highlightedWordChunkList, foundText) {
    return reduce(highlightedWordChunkList, function (acc, highlightedWordChunk) {
        var accOffsetLength = getCombinedWordLength(acc),
            foundTextSlice,
            highlightedWordChunkLength;

        highlightedWordChunkLength = getCombinedWordLength([
            highlightedWordChunk
        ]);
        foundTextSlice = foundText.slice(accOffsetLength, accOffsetLength + highlightedWordChunkLength);

        if (highlightedWordChunk.inputValueWord) {
            return acc.concat({
                "inputValueWord": foundTextSlice,
                "isHighlighted": highlightedWordChunk.isHighlighted
            });
        }

        return acc.concat(foundTextSlice);
    }, []);
}

module.exports = overlayHighlightedWordChunkList;
