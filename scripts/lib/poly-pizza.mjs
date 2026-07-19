// Pure helpers for resolving Poly Pizza models. No network here (testable).

export function extractModelShortIds(html) {
  const ids = new Set();
  // Matches /m/<id> and the escaped /m/<id> form. Real poly.pizza public ids can contain
  // hyphens/underscores (e.g. "1xBl-8de6b0"), so the id charset must include them or ids
  // get silently truncated/dropped, quietly removing real models from the bundle index.
  const re = /(?:\/m\/|\\u002Fm\\u002F)([A-Za-z0-9_-]{6,})/g;
  let m;
  while ((m = re.exec(html)) !== null) ids.add(m[1]);
  return [...ids];
}

// Model pages embed the raw JS string `\uXXXX`-escapes characters like "/" that would
// otherwise need escaping in the surrounding markup. Decode so extracted text matches
// the plain-text MANIFEST display names.
function unescapeUnicode(s) {
  return s.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

export function extractModelInfo(html) {
  // og:title on real model pages is "<Name> - Free Model By <Author>", not the bare
  // name, so it can't be matched against MANIFEST display names directly. The page's
  // window.__SERVER_APP_STATE__ blob has a bare `"Title":"..."` field — prefer that.
  const nameMatch =
    html.match(/["']Title["']\s*:\s*["']([^"']+)["']/) ||
    html.match(/property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
    html.match(/["']name["']\s*:\s*["']([^"']+)["']/);
  const glbMatch = html.match(/https:\/\/static\.poly\.pizza\/[a-f0-9-]+\.glb(?!\.br)/i);
  const authorMatch =
    html.match(/href=["']\/u\/[^"']+["'][^>]*>([^<]+)</i) ||
    html.match(/["'](?:author|creator|username)["']\s*:\s*["']([^"']+)["']/i);
  let license = null;
  if (/\bCC0\b|public domain/i.test(html)) license = "CC0";
  else if (/CC-?BY|creative commons attribution/i.test(html)) license = "CC-BY";
  return {
    name: nameMatch ? unescapeUnicode(nameMatch[1].trim()) : null,
    glbUrl: glbMatch ? glbMatch[0] : null,
    author: authorMatch ? unescapeUnicode(authorMatch[1].trim()) : null,
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
