import Button from "../../../components/button/Button";
import Info from "../../../components/info/Info";
import { IMangaSource } from "../../../shared/interfaces/manga";
import Sources from "./Sources";

import "../Manga.scss";

interface Props {
  coverUrl: string;
  isUserFollowing: boolean;
  sources: IMangaSource[];
  type: string;
}

function ContentLeft({ coverUrl, isUserFollowing, sources, type }: Props) {
  return (
    <div className="left-side flex column gap-4">
      <div className="flex column gap-1">
        <img
          className="radius-2"
          src={coverUrl}
          alt="cover"
          style={{ maxHeight: 450 }}
        />
        <Button
          fontSize="fsize-5"
          height="50px"
          icon="gear"
          text={isUserFollowing ? "Following" : "Follow"}
          variant={isUserFollowing ? "success" : "danger"}
        />
      </div>
      <Sources sources={sources} />
      <div className="flex column gap-1">
        <Info description={type} header="Type" icon={"book"} />
        <Info description={"0"} header="Users Tracking" icon={"users"} />
      </div>
    </div>
  );
}

export default ContentLeft;
