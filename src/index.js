/**
 * Copyright (c) 2016-present, Absolvent
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const escapeRegExp = require('lodash/escapeRegExp');
const flatten = require('lodash/flatten');
const map = require('lodash/map');
const overlayHighlightedWordChunkList = require('./overlayHighlightedWordChunkList');
const reduce = require('lodash/reduce');
const words = require('lodash/words');

function createSplitRegExpFromWord(inputValueWord) {
  return new RegExp(escapeRegExp(inputValueWord), 'i');
}

function isLastIndex(index, inputList) {
  return index >= inputList.length - 1;
}

function sortWordsDescendingByLength(left, right) {
  return right.length - left.length;
}

function highlightFoundText(inputValue, foundText, leftDelimiter, rightDelimiter) {
  const sortedWords = words(inputValue).sort(sortWordsDescendingByLength);
  const highlightedWordChunkList = reduce(sortedWords, (foundTextWordList, inputValueWord) => (
    flatten(map(foundTextWordList, function (foundTextWord) {
      if (foundTextWord.isHighlighted) {
        return foundTextWord;
      }

      const splittedWord = foundTextWord.split(createSplitRegExpFromWord(inputValueWord));

      return reduce(splittedWord, function (combinedWord, wordChunk, index, inputList) {
        combinedWord.push(wordChunk);
        if (!isLastIndex(index, inputList)) {
          combinedWord.push({
            inputValueWord,
            isHighlighted: true,
          });
        }

        return combinedWord;
      }, []);
    }))
  ), [
    foundText,
  ]);

  function doReduce(acc, foundTextChunk) {
    return {
      highlightText: foundText,
      highlightedText: acc.highlightedText + (
        foundTextChunk.isHighlighted ? (
          leftDelimiter + foundTextChunk.inputValueWord + rightDelimiter
        ) : (
          foundTextChunk
        )
      ),
      inputText: inputValue,
      isHighlighted: acc.isHighlighted || foundTextChunk.isHighlighted,
    };
  }

  return reduce(overlayHighlightedWordChunkList(highlightedWordChunkList, foundText), doReduce, {
    highlightText: foundText,
    highlightedText: '',
    inputText: inputValue,
    isHighlighted: false,
  });
}

module.exports = highlightFoundText;
