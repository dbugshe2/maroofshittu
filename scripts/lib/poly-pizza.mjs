// Pure helpers for resolving Poly Pizza models. No network here (testable).

export function extractModelShortIds(html) {
  const ids = new Set();
  // Matches /m/<id> and the escaped /m/<id> form.
  const re = /(?:\/m\/|\\u002Fm\\u002F)([A-Za-z0-9]{6,})/g;
  let m;
  while ((m = re.exec(html)) !== null) ids.add(m[1]);
  return [...ids];
}

export function extractModelInfo(html) {
  const nameMatch =
    html.match(/property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
    html.match(/["']name["']\s*:\s*["']([^"']+)["']/);
  const glbMatch = html.match(/https:\/\/static\.poly\.pizza\/[a-f0-9-]+\.glb(?!\.br)/i);
  let license = null;
  if (/\bCC0\b|public domain/i.test(html)) license = "CC0";
  else if (/CC-?BY|creative commons attribution/i.test(html)) license = "CC-BY";
  return {
    name: nameMatch ? nameMatch[1].trim() : null,
    glbUrl: glbMatch ? glbMatch[0] : null,
    license,
  };
}

export function pickBest(candidates, { name, author }) {
  const byName = candidates.filter(
    (c) => c.name && c.name.toLowerCase() === name.toLowerCase(),
  );
  if (byName.length === 0) return null;
  if (author) {
    const byAuthor = byName.find(
      (c) => c.author && c.author.toLowerCase() === author.toLowerCase(),
    );
    if (byAuthor) return byAuthor;
  }
  return byName[0];
}
