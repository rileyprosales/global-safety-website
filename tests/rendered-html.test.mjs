
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const clientRoot = new URL("../dist/client/", import.meta.url);

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`), {
    ASSETS: {
      fetch: async (request) => {
        const path = new URL(request.url).pathname.replace(/^\//, "");
        try {
          const body = await readFile(new URL(path, clientRoot));
          const type = path.endsWith(".html") ? "text/html; charset=utf-8" : "application/octet-stream";
          return new Response(body, { status: 200, headers: { "content-type": type } });
        } catch {
          return new Response("Not found", { status: 404 });
        }
      },
    },
  });
}

test("serves all primary Global Safety pages", async () => {
  for (const route of [
    "/", "/programs", "/programs/first-aid-cpr-aed", "/programs/threat-ready-survival",
    "/programs/safety-dragons", "/programs/emergency-preparedness", "/who-we-serve",
    "/about", "/gallery", "/faqs", "/contact", "/thank-you", "/privacy",
    "/accessibility", "/disclaimer"
  ]) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, /GLOBAL SAFETY|Global Safety/i);
    assert.match(html, /800-562-2318/);
    assert.match(html, /<nav aria-label="Main navigation">/);
    assert.match(html, /<meta name="viewport"/);
  }
});

test("home and programs pages contain the core published offerings", async () => {
  const home = await (await render("/")).text();
  const programs = await (await render("/programs")).text();
  for (const program of ["First Aid, CPR & AED", "Threat Ready Survival", "Safety Dragons", "Emergency Preparedness"]) {
    assert.match(home, new RegExp(program.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(programs, new RegExp(program.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(home, /Train for the <em>moment<\/em> that matters/);
  assert.match(home, /data-reveal/);
  assert.match(home, /hero-prepared\.webp/);
  assert.match(programs, /Training that turns awareness into action/);
});

test("contact page includes the recommended inquiry fields and a confirmation route", async () => {
  const contact = await (await render("/contact")).text();
  assert.match(contact, /Organization type/);
  assert.match(contact, /Estimated participants/);
  assert.match(contact, /Preferred timeframe/);
  assert.match(contact, /action="\/thank-you"/);
  const confirmation = await (await render("/thank-you")).text();
  assert.match(confirmation, /Thank you for contacting Global Safety/);
});

test("finished site contains its social card and no starter preview marker", async () => {
  const [home, layout, packageJson, socialCard] = await Promise.all([
    readFile(new URL("index.html", clientRoot), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("og.jpg", clientRoot)),
  ]);
  assert.doesNotMatch(home, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
  assert.doesNotMatch(layout, /codex-preview|Starter Project|_sites-preview/i);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.ok(socialCard.length > 100_000);
});

