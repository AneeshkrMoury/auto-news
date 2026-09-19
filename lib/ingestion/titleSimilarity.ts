// Lightweight duplicate check based on title word-overlap (Jaccard
// similarity) — not true semantic clustering, just catches near-identical
// headlines across sources without needing embeddings or an NLP model.
function normalize(title: string): Set<string> {
  return new Set(
    title
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 2) // skip tiny words like "a", "the", "to"
  );
}

export function titleSimilarity(a: string, b: string): number {
  const setA = normalize(a);
  const setB = normalize(b);

  const intersection = new Set([...setA].filter((word) => setB.has(word)));
  const union = new Set([...setA, ...setB]);

  return union.size === 0 ? 0 : intersection.size / union.size;
}