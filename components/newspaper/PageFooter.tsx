// Centered page number at the bottom of each page.
import { theme } from "@/lib/theme";

export default function PageFooter({ pageNumber }: { pageNumber: number }) {
  return (
    <div className="text-center mt-8 text-xs tracking-widest" style={{ color: theme.gold }}>
      — Page {pageNumber} —
    </div>
  );
}