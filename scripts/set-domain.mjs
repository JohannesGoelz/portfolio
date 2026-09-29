import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
const root = fileURLToPath(new URL("../", import.meta.url));
const domain = process.argv[2];
if (
  !domain ||
  !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+is-not-a\.dev$/.test(domain)
)
  throw new Error("Expected a valid subdomain of is-not-a.dev");
const old = readFileSync(resolve(root, "public/.domains"), "utf8").trim();
for (const path of ["index.html", "public/robots.txt", "public/sitemap.xml"]) {
  const full = resolve(root, path);
  writeFileSync(full, readFileSync(full, "utf8").replaceAll(old, domain));
}
writeFileSync(resolve(root, "public/.domains"), domain + "\n");
console.log(
  `Updated canonical, Open Graph, robots, sitemap and .domains to ${domain}. Rebuild before deploying.`,
);
