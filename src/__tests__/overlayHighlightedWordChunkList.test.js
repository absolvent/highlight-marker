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
var overlayHighlightedWordChunkList = require('../overlayHighlightedWordChunkList');

describe('absolvent/highlightFoundText/overlayHighlightedWordChunkList', function () {
  it('masks highlighted word chunk list', function () {
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
