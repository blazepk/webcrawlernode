const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL remove http", () => {
  const input = "http://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL remove trailing slash ", () => {
  const input = "http://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});
test("normalizeURL capitals", () => {
  const input = "http://BLOG.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});
test("normalizeURL capitals", () => {
  const input = "http://BLOG.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
    <html>
    <body>
    <a href="https://blog.boot.dev">
    Boot.dev Blog</a>
    </body>
    </html>
    `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
    <html>
    <body>
    <a href="/path1/">
    Boot.dev Blog</a>
    <a href="https://blog.boot.dev/path2/">
    Boot.dev Blog</a>
    </body>
    </html>
    `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid", () => {
  const inputHTMLBody = `
    <html>
    <body>
    <a href="invalid">
    Boot.dev Blog</a>
    </body>
    </html>
    `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
