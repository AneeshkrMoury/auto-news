// Article's hero image. Slight sepia filter keeps it in tone with the aged-paper look.
// Article image, floated to one side so body text wraps around it —
// alternates left/right by page number, matching real newspaper folio rhythm.
// Full-width hero image at the top of the article.
export default function ArticleImage({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      className="w-full h-[380px] object-cover block mb-8"
      style={{ filter: "sepia(8%) contrast(1.02)" }}
    />
  );
}