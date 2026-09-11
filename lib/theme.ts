// Shared design tokens for the newspaper UI.
// Change a color here once — every component picks it up automatically.
export const theme = {
  paper: "#F1E9D8",
  ink: "#1E1B16",
  red: "#7A2A2A",
  gray: "#6B6355",
  gold: "#B4915A",
  // Subtle noise texture, applied as a background layer on every page.
  paperTexture: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
};

