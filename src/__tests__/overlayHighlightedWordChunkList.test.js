/**
 * @license Copyright (c) 2015-present, Absolvent.pl
 * For licensing, see LICENSE
 */

"use strict";

/* global describe: false, it: false */

var assert = require("chai").assert,
    path = require("path"),
    overlayHighlightedWordChunkList = require(path.resolve(__dirname, "../../highlightFoundText/overlayHighlightedWordChunkList"));

describe("absolvent/highlightFoundText/overlayHighlightedWordChunkList", function () {
    it("masks highlighted word chunk list", function () {
        assert.deepEqual(overlayHighlightedWordChunkList([
            "",
            {
                "inputValueWord": "f",
                "isHighlighted": true
            },
            " U",
            {
                "inputValueWord": "f",
                "isHighlighted": false
            },
            "aSd"
        ], "F UfASd"), [
            "",
            {
                "inputValueWord": "F",
                "isHighlighted": true
            },
            " U",
            {
                "inputValueWord": "f",
                "isHighlighted": false
            },
            "ASd"
        ]);
    });
});
