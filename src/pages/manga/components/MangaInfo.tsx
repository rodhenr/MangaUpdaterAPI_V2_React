import Genres from "./Genres";

interface Props {
  alternativeName: string;
  artist: string;
  author: string;
  genres: string[];
  name: string;
}

function MangaInfo({ alternativeName, artist, author, genres, name }: Props) {
  return (
    <div className="flex column gap-4">
      <div>
        <h1 className="fsize-6">{name}</h1>
        <h3>{alternativeName}</h3>
      </div>
      <div className="flex gap-6">
        <p>
          <span className="font-bold">Author:</span> {author}
        </p>
        <p>
          <span className="font-bold">Artist:</span> {artist}
        </p>
      </div>
      <Genres genres={genres} />
    </div>
  );
}

export default MangaInfo;
