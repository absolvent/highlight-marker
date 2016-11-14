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
const overlayHighlightedWordChunkList = require('../overlayHighlightedWordChunkList');

describe('absolvent/highlightFoundText/overlayHighlightedWordChunkList', () => {
  it('masks highlighted word chunk list', () => {
    assert.deepEqual(overlayHighlightedWordChunkList([
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
      'aSd',
    ], 'F UfASd'), [
      '',
      {
        inputValueWord: 'F',
        isHighlighted: true,
      },
      ' U',
      {
        inputValueWord: 'f',
        isHighlighted: false,
      },
      'ASd',
    ]);
  });
});
