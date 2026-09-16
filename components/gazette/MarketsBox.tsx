// Real gold/silver spot prices, styled after the template's Markets
// widget — no fake percentage-change arrows since we don't have
// reliable free historical data to back that.
import { theme } from "@/lib/theme";


type MetalPrices = { gold: string; silver: string; platinum: string; palladium: string } | null;

export default function MarketsBox({ prices }: { prices: MetalPrices }) {
  if (!prices) return null;

  const rows = [
    { label: "Gold (oz)", value: prices.gold },
    { label: "Silver (oz)", value: prices.silver },
    { label: "Platinum (oz)", value: prices.platinum },
    { label: "Palladium (oz)", value: prices.palladium },
  ];

  return (
    <div style={{ background: theme.card, border: `1px solid ${theme.rule}` }}>
      <div className="px-4 py-3 border-b" style={{ borderColor: theme.ink }}>
        <span className="text-xs uppercase tracking-wide font-bold" style={{ fontFamily: "var(--font-mono)", color: theme.ink }}>
          Markets
        </span>
      </div>
      <div className="px-4 py-3 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between items-center">
            <span className="text-sm" style={{ fontFamily: "var(--font-mono)", color: theme.ink2 }}>{row.label}</span>
            <span className="text-sm font-bold" style={{ fontFamily: "var(--font-mono)", color: theme.ink }}>${row.value}</span>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 text-xs border-t" style={{ borderColor: theme.rule, color: theme.ink3, fontFamily: "var(--font-mono)" }}>
        Spot price, updated hourly
      </div>
    </div>
  );
}