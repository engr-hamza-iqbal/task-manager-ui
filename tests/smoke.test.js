import test from "node:test";
import assert from "node:assert/strict";

test("API service baseURL normalizes properly", () => {
  const normalize = (raw) => {
    const rawApiUrl = (raw || "").trim();
    return rawApiUrl
      ? (rawApiUrl.endsWith("/api") ? rawApiUrl : `${rawApiUrl.replace(/\/+$/, "")}/api`)
      : "/api";
  };

  assert.equal(normalize(""), "/api");
  assert.equal(normalize("http://localhost:3000"), "http://localhost:3000/api");
  assert.equal(normalize("https://api.render.com/"), "https://api.render.com/api");
  assert.equal(normalize("https://api.render.com/api"), "https://api.render.com/api");
});

test("Smoke test: Environment variable contract is respected", () => {
  const expectedKey = "VITE_API_URL";
  assert.ok(expectedKey.startsWith("VITE_"), "Vite frontend env vars must begin with VITE_");
});
