/**
 * Copyright (c) 2016-present, Absolvent
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const getCombinedWordLength = require('./getCombinedWordLength');
const reduce = require('lodash/reduce');

function overlayHighlightedWordChunkList(highlightedWordChunkList, foundText) {
  return reduce(highlightedWordChunkList, function (acc, highlightedWordChunk) {
    const offset = getCombinedWordLength(acc);
    const highlightedWordChunkLength = getCombinedWordLength([
      highlightedWordChunk,
    ]);
    const foundTextSlice = foundText.slice(offset, offset + highlightedWordChunkLength);

    if (highlightedWordChunk.inputValueWord) {
      return acc.concat({
        inputValueWord: foundTextSlice,
        isHighlighted: highlightedWordChunk.isHighlighted,
      });
    }

    return acc.concat(foundTextSlice);
  }, []);
}

module.exports = overlayHighlightedWordChunkList;
