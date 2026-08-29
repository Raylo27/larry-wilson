#!/usr/bin/env node
/**
 * Zero-dependency build check for the Larry Wilson static site.
 * "npm run build" validates that public/index.html contains the
 * required section anchors and key real-content markers.
 * Exits 0 on success, 1 on failure.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "public", "index.html");
const html = fs.readFileSync(file, "utf8");

const errors = [];
const checks = [];

function required(label, ok) {
  checks.push([label, ok]);
  if (!ok) errors.push(label);
}

// --- Required sections ---------------------------------------------------
required("section #top exists", /id="top"/.test(html));
required("section #about exists", /id="about"/.test(html));
required("section #coaching exists", /id="coaching"/.test(html));
required("section #speaking exists", /id="speaking"/.test(html));
required("section #contact exists", /id="contact"/.test(html));
required("page title mentions Larry Wilson", /<title>[^<]*Larry Wilson/.test(html));

// --- Required real content (no placeholders) ------------------------------
required(
  "real Patreon link present",
  /https:\/\/www\.patreon\.com\/u65294389/.test(html)
);
required(
  "no leftover placeholder Patreon links",
  !/patreon\.com\/PLACEHOLDER/.test(html)
);
required(
  "booking email present",
  /larrywilson194@yahoo\.com/.test(html)
);

checks.forEach(([label, ok]) => {
  console.log(`${ok ? "✔" : "✘"} ${label}`);
});

if (errors.length) {
  console.error(`\n${errors.length} check(s) failed.`);
  process.exit(1);
}
console.log(`\nAll ${checks.length} checks passed.`);
process.exit(0);
