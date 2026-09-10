// Article's hero image. Slight sepia filter keeps it in tone with the aged-paper look.
// Article image, floated to one side so body text wraps around it —
// alternates left/right by page number, matching real newspaper folio rhythm.
export default function ArticleImage({ src, side }: { src: string; side: "left" | "right" }) {
  return (
    <img
      src={src}
      alt=""
      className={`w-[280px] mb-2 block ${side === "right" ? "ml-6" : "mr-6"}`}
      style={{ float: side, shapeOutside: "margin-box", filter: "sepia(8%) contrast(1.02)" }}
    />
  );
}