/**
 * @license Copyright (c) 2015-present, Absolvent.pl
 * For licensing, see LICENSE
 */

"use strict";

/* global describe: false, it: false */

var assert = require("chai").assert,
    path = require("path"),
    highlightFoundText = require(path.resolve(__dirname, "../../highlightFoundText"));

describe("absolvent/highlightFoundText/index", function () {
    it("highlights found text using input", function () {
        var highlighted = highlightFoundText("foo", "fufooboor", "[", "]");

        assert.ok(highlighted.isHighlighted);
        assert.strictEqual(highlighted.highlightedText, "fu[foo]boor");
    });

    it("highlights several words", function () {
        var highlighted = highlightFoundText("f foo or", "fufooboor", "[", "]");

        assert.ok(highlighted.isHighlighted);
        assert.strictEqual(highlighted.highlightedText, "[f]u[foo]bo[or]");
    });

    it("highlights several words", function () {
        var highlighted = highlightFoundText("f foo or", "f ufo oboor", "[", "]");

        assert.ok(highlighted.isHighlighted);
        assert.strictEqual(highlighted.highlightedText, "[f] u[f]o obo[or]");
    });

    it("letter case is preserved", function () {
        var highlighted = highlightFoundText("f foo or", "F UfO ObOoR", "[", "]");

        assert.ok(highlighted.isHighlighted);
        assert.strictEqual(highlighted.highlightedText, "[F] U[f]O ObO[oR]");
    });
});
