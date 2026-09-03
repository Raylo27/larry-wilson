#!/usr/bin/env node
/**
 * Zero-dependency build check for the Larry Wilson static site.
 * "npm run build" validates that index.html:
 *   1. contains every required section anchor
 *   2. carries the required placeholder TODO markers
 *   3. has balanced tags for the elements we control
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

// --- Required sections -------------------------------------------------
required("section #story exists", /id="story"/.test(html));
required("section #coaching exists", /id="coaching"/.test(html));
required("section #speaking exists", /id="speaking"/.test(html));
required("section #testimonials exists", /id="testimonials"/.test(html));
required("section #contact exists", /id="contact"/.test(html));
required("hero contains name + tagline", /<h1>Larry Wilson<\/h1>/.test(html) && /class="tagline"/.test(html));
required("platform links row present", (html.match(/class="platform-card"/g) || []).length >= 4);

// --- Required CTAs ------------------------------------------------------
const patreonCount = (html.match(/https:\/\/patreon\.com\/PLACEHOLDER/g) || []).length;
required("Patreon CTA placeholder href present (>=4 occurrences)", patreonCount >= 4);
const mailtoCount = (html.match(/mailto:booking@larrywilsoncoaching\.com/g) || []).length;
required("booking mailto placeholder present (>=3 occurrences)", mailtoCount >= 3);
required('hero CTA "Join the Coaching Community" present', html.includes("Join the Coaching Community"));
required('hero CTA "Book Me to Speak" present', html.includes("Book Me to Speak"));
required("speaking section has Book Larry CTA", /id="speaking"[\s\S]*Book Me to Speak/.test(html) || /Book Me to Speak[\s\S]*id="speaking"/.test(html));
required("social proof counters present", (html.match(/class="stat"/g) || []).length >= 3);

// --- Credentials, photos, real speaking email ---------------------------
required("speaking email larrywilson194@yahoo.com clickable (>=2 mailto)", (html.match(/mailto:larrywilson194@yahoo\.com/g) || []).length >= 2);
required("speaking email larrywilson194@yahoo.com visible", html.includes(">larrywilson194@yahoo.com</a>"));
const creds = [
  "Owner of multiple coffee shops",
  "Stock market investor",
  "Commercial &amp; residential real estate",
  "Mentored hundreds on digital platforms",
];
required("credentials section present (all 4 items)", creds.every((c) => html.includes(c)));
required("hero photo referenced", html.includes('src="/assets/larry-hero.jpg"'));
required("about photo referenced", html.includes('src="/assets/larry-about.jpg"'));

// --- TODO markers -------------------------------------------------------
const todoCount = (html.match(/TODO/g) || []).length;
required("TODO markers present for placeholder fill-in", todoCount >= 10);

// --- Balanced tags ------------------------------------------------------
function checkBalanced(tag) {
  const open = (html.match(new RegExp("<" + tag + "(\\s|>)", "g")) || []).length;
  const close = (html.match(new RegExp("</" + tag + ">", "g")) || []).length;
  required("<" + tag + "> balanced (" + open + "/" + close + ")", open === close);
}
["div", "section", "span", "a", "p", "h1", "h2", "h3", "ul", "li", "header", "main", "footer", "nav", "strong", "em"].forEach(checkBalanced);

// --- Output -------------------------------------------------------------
const passed = checks.filter(([, ok]) => ok).length;
console.log(`\n  Larry Wilson build check`);
console.log(`  ${passed}/${checks.length} checks passed`);
if (errors.length) {
  console.log("\n  FAILED:");
  errors.forEach((e) => console.log("    ✗ " + e));
  console.log("");
  process.exit(1);
}
console.log("  ✓ all required sections, CTAs, and placeholders present\n");
process.exit(0);
