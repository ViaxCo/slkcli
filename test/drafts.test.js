import assert from "node:assert/strict";
import test from "node:test";

import { richTextElements } from "../src/drafts.js";

test("draft text turns user tags and URLs into rich text elements", () => {
  assert.deepEqual(
    richTextElements("<@U071Y25H1M4> please review\nhttps://github.com/a/b/pull/1\n<https://x.dev/y|y>"),
    [
      { type: "user", user_id: "U071Y25H1M4" },
      { type: "text", text: " please review\n" },
      { type: "link", url: "https://github.com/a/b/pull/1" },
      { type: "text", text: "\n" },
      { type: "link", url: "https://x.dev/y", text: "y" },
    ],
  );
});

test("plain draft text stays one text element", () => {
  assert.deepEqual(richTextElements("hello"), [{ type: "text", text: "hello" }]);
});

test("bare URLs leave trailing punctuation as text", () => {
  assert.deepEqual(richTextElements("see (https://x.dev/a)."), [
    { type: "text", text: "see (" },
    { type: "link", url: "https://x.dev/a" },
    { type: "text", text: ")." },
  ]);
});
