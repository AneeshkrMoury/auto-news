// Cheap-but-real validation: extract numbers and likely proper nouns
// from the generated text, confirm each appears somewhere in the
// original source material. Flags fabrication without needing a
// second full LLM call or a real fact-checking service.
function extractNumbers(text: string): string[] {
  return text.match(/\b\d+(\.\d+)?%?\b/g) || [];
}

function extractProperNouns(text: string): string[] {
  const matches = text.match(/\b[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)+\b/g) || [];
  return matches
    .map((m) => m.replace(/^(The|A|An)\s+/, "")) // strip leading sentence-starting articles
    .filter((m) => m.length > 4);
}

export function validateClaims(generatedBody: string, sourceText: string) {
  const sourceLower = sourceText.toLowerCase();
  const unverified: string[] = [];

  for (const num of extractNumbers(generatedBody)) {
    if (!sourceLower.includes(num.toLowerCase())) unverified.push(num);
  }

  for (const noun of extractProperNouns(generatedBody)) {
    if (!sourceLower.includes(noun.toLowerCase())) unverified.push(noun);
  }

  return {
    passed: unverified.length === 0,
    unverified,
  };
}