// Article's hero image. Slight sepia filter keeps it in tone with the aged-paper look.
export default function ArticleImage({ src }: { src: string }) {
  return (
    <figure className="mb-6">
      <img src={src} alt="" className="w-full block" style={{ filter: "sepia(8%) contrast(1.02)" }} />
    </figure>
  );
}