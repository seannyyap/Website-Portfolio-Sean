import assert from "node:assert/strict"
import sitemap from "../app/sitemap"
import robots from "../app/robots"

function run(): void {
  const sitemapEntries = sitemap()
  assert.ok(Array.isArray(sitemapEntries), "sitemap should return an array")
  assert.ok(sitemapEntries.length > 0, "sitemap should include at least one URL")
  assert.ok(Boolean(sitemapEntries[0]?.url), "first sitemap entry should include a url")

  const robotsConfig = robots()
  const rules = Array.isArray(robotsConfig.rules)
    ? robotsConfig.rules[0]
    : robotsConfig.rules
  assert.equal(rules?.allow, "/", "robots should allow crawling root")

  const sitemapValue = Array.isArray(robotsConfig.sitemap)
    ? robotsConfig.sitemap[0]
    : robotsConfig.sitemap
  assert.ok(
    sitemapValue === undefined || sitemapValue.endsWith("/sitemap.xml"),
    "robots sitemap should be undefined or end with /sitemap.xml",
  )

  console.log("metadata smoke tests passed")
}

run()
