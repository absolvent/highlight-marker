/**
 * @license Copyright (c) 2015-present, Absolvent.pl
 * For licensing, see LICENSE
 */

"use strict";

var escapeRegExp = require("lodash/escapeRegExp"),
    flatten = require("lodash/flatten"),
    map = require("lodash/map"),
    overlayHighlightedWordChunkList = require("./overlayHighlightedWordChunkList"),
    reduce = require("lodash/reduce"),
    words = require("lodash/words");

function createSplitRegExpFromWord(inputValueWord) {
    return new RegExp(escapeRegExp(inputValueWord), "i");
}

function highlightFoundText(inputValue, foundText, leftDelimiter, rightDelimiter) {
    var highlightedWordChunkList;

    highlightedWordChunkList = reduce(words(inputValue).sort(sortWordsDescendingByLength), function (foundTextWordList, inputValueWord) {
        return flatten(map(foundTextWordList, function (foundTextWord) {
            if (foundTextWord.isHighlighted) {
                return foundTextWord;
            }

            return reduce(foundTextWord.split(createSplitRegExpFromWord(inputValueWord)), function (combinedWord, wordChunk, index, inputList) {
                combinedWord.push(wordChunk);
                if (!isLastIndex(index, inputList)) {
                    combinedWord.push({
                        "inputValueWord": inputValueWord,
                        "isHighlighted": true
                    });
                }

                return combinedWord;
            }, []);
        }));
    }, [
        foundText
    ]);

    return reduce(overlayHighlightedWordChunkList(highlightedWordChunkList, foundText), function (acc, foundTextChunk) {
        return {
            "highlightText": foundText,
            "highlightedText": acc.highlightedText + (
                foundTextChunk.isHighlighted ? (
                    leftDelimiter + foundTextChunk.inputValueWord + rightDelimiter
                ) : (
                    foundTextChunk
                )
            ),
            "inputText": inputValue,
            "isHighlighted": acc.isHighlighted || foundTextChunk.isHighlighted
        };
    }, {
        "highlightText": foundText,
        "highlightedText": "",
        "inputText": inputValue,
        "isHighlighted": false
    });
}

function isLastIndex(index, inputList) {
    return index >= inputList.length - 1;
}

function sortWordsDescendingByLength(left, right) {
    return right.length - left.length;
}

module.exports = highlightFoundText;
