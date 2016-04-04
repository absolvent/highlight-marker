/**
 * @license Copyright (c) 2015-present, Absolvent.pl
 * For licensing, see LICENSE
 */

"use strict";

/* global describe: false, it: false */

var assert = require("chai").assert,
    path = require("path"),
    getCombinedWordLength = require(path.resolve(__dirname, "../../highlightFoundText/getCombinedWordLength"));

describe("absolvent/highlightFoundText/getCombinedWordLength", function () {
    it("counts output character list length", function () {
        assert.strictEqual(getCombinedWordLength([
            "",
            {
                "inputValueWord": "f",
                "isHighlighted": true
            },
            " U",
            {
                "inputValueWord": "f",
                "isHighlighted": false
            }
        ]), 4);
    });
});
