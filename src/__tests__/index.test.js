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
const highlightFoundText = require('../index');

describe('absolvent/highlightFoundText/index', () => {
  it('highlights found text using input', () => {
    const highlighted = highlightFoundText('foo', 'fufooboor', '[', ']');

    assert.ok(highlighted.isHighlighted);
    assert.strictEqual(highlighted.highlightedText, 'fu[foo]boor');
  });

  it('highlights several words', () => {
    const highlighted = highlightFoundText('f foo or', 'fufooboor', '[', ']');

    assert.ok(highlighted.isHighlighted);
    assert.strictEqual(highlighted.highlightedText, '[f]u[foo]bo[or]');
  });

  it('highlights several words', () => {
    const highlighted = highlightFoundText('f foo or', 'f ufo oboor', '[', ']');

    assert.ok(highlighted.isHighlighted);
    assert.strictEqual(highlighted.highlightedText, '[f] u[f]o obo[or]');
  });

  it('letter case is preserved', () => {
    const highlighted = highlightFoundText('f foo or', 'F UfO ObOoR', '[', ']');

    assert.ok(highlighted.isHighlighted);
    assert.strictEqual(highlighted.highlightedText, '[F] U[f]O ObO[oR]');
  });
});
