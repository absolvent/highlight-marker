/**
 * Copyright (c) 2016-present, Absolvent
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/* global describe: false, it: false */

const assert = require('assert');
const getCombinedWordLength = require('../getCombinedWordLength');

describe('absolvent/highlightFoundText/getCombinedWordLength', () => {
  it('counts output character list length', () => {
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
