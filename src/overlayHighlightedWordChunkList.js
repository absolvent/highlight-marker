/**
 * Copyright (c) 2016-present, Absolvent
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/* eslint no-var: 0 */

var getCombinedWordLength = require('./getCombinedWordLength');
var reduce = require('lodash/reduce');

function overlayHighlightedWordChunkList(highlightedWordChunkList, foundText) {
  return reduce(highlightedWordChunkList, function (acc, highlightedWordChunk) {
    var offset = getCombinedWordLength(acc);
    var highlightedWordChunkLength = getCombinedWordLength([
      highlightedWordChunk,
    ]);
    var foundTextSlice = foundText.slice(offset, offset + highlightedWordChunkLength);

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
