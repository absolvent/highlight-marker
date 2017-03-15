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
const replacementList = require('diacritics').replacementList;

function createSplitRegExpFromWord(inputValueWord) {
  const dict = {};

  // exchange every occurrence of o, ó or a, ą ... with [oó] and [aą] ...
  // eg. "aóż" => "[aą...][oó...][zż...]"
  let aliasSpecialCharsRegexp = '';
  for (const obj of replacementList) {
    if (obj.base.length === 1 && obj.base.toLowerCase() === obj.base) {
      const pattern = escapeRegExp(obj.base + obj.chars).split('').join('|');
      for (const char of pattern) {
        aliasSpecialCharsRegexp += char;
        dict[char] = pattern;
      }
    }
  }

  return new RegExp(inputValueWord.toLowerCase().replace(
    new RegExp(`[${aliasSpecialCharsRegexp}]`, 'g'),
    v => `[${dict[v]}]`
  ), 'i');
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
    flatten(map(foundTextWordList, foundTextWord => {
      if (foundTextWord.isHighlighted) {
        return foundTextWord;
      }

      const splittedWord = foundTextWord.split(createSplitRegExpFromWord(inputValueWord));

      return reduce(splittedWord, (combinedWord, wordChunk, index, inputList) => {
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
