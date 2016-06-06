/**
 * Copyright (c) 2016-present, Absolvent
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/* global describe: false, it: false */

var assert = require('chai').assert;
var getCombinedWordLength = require('../getCombinedWordLength');

describe('absolvent/highlightFoundText/getCombinedWordLength', function () {
  it('counts output character list length', function () {
    assert.strictEqual(getCombinedWordLength([
      '',
      {
        inputValueWord: 'f',
        isHighlighted: true,
      },
      ' U',
      {
        inputValueWord: 'f',
        isHighlighted: false,
      },
    ]), 4);
  });
});
