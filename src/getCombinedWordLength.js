/**
 * Copyright (c) 2016-present, Absolvent
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/* eslint no-var: 0 */

var reduce = require('lodash/reduce');

function getCombinedWordLength(combinedWord) {
  return reduce(combinedWord, function (acc, wordChunk) {
    if (wordChunk.inputValueWord) {
      return acc + wordChunk.inputValueWord.length;
    }

    return acc + wordChunk.length;
  }, 0);
}

module.exports = getCombinedWordLength;
