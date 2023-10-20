import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import { axios } from "../../lib/axios";
import AuthContext from "../../shared/context/AuthContext";
import useReadFromLocalStorage, {
  StorageValue,
} from "../../hooks/useReadFromLocalStorage";
import { IDefaultUserInfo } from "../../shared/interfaces/auth";
import { IMangaData } from "../../shared/interfaces/manga";
import Button from "../../components/button/Button";

import "./Manga.scss";
import Card from "../../components/card/Card";

function Manga() {
  const authContext = useContext(AuthContext);
  const userInfo: StorageValue<IDefaultUserInfo> =
    useReadFromLocalStorage("userInfo");

  const { mangaId } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["homeData"],
    queryFn: () =>
      axios
        .get<IMangaData>(`/api/manga/${mangaId}`, {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        })
        .then((res) => res.data)
        .catch((error) => {
          if (error.response.status === 401) {
            authContext.logout();
          } else {
            console.log(error.response);
          }
        }),
  });

  if (isPending) return "Loading...";

  if (error) return "error...";

  return data ? (
    <div className="manga-main flex column gap-4 border-box">
      <div className="top flex gap-4">
        <div className="left-side flex column gap-2">
          <img
            className="radius-2"
            src={data.coverUrl}
            alt="cover"
            style={{ maxHeight: 450 }}
          />
          <Button
            height="35px"
            icon="gear"
            text={data.isUserFollowing ? "Following" : "Follow"}
            variant={data.isUserFollowing ? "success" : "danger"}
          />
          <div className="flex flex-wrap">
            {data.sources &&
              data.sources.map((source) => {
                return <Button key={uuidv4()} text={source.name} />;
              })}
          </div>
          <div>
            <h1>Type</h1>
            <h1>{data.type}</h1>
          </div>
          <div>
            <h1>Users Tracking</h1>
            <h1>0</h1>
          </div>
        </div>
        <div className="right-side flex column gap-5">
          <div>
            <h1 className="fsize-6">{data.name}</h1>
            <h3>{data.alternativeName}</h3>
            <div className="flex gap-4">
              <p>
                <span className="font-bold">Author:</span> {data.author}
              </p>
              <p>
                <span className="font-bold">Artist:</span> {data.author}
              </p>
            </div>
          </div>
          <div className="flex column gap-2">
            <h1 className="fsize-5">Synopsis</h1>
            <div className="secondary-light radius-2 p-4">
              <p className="text-justify">{data.synopsis}</p>
            </div>
          </div>

          <div>
            <h1>Updates</h1>
            <div>
              {data.chapters &&
                data.chapters.map((chapter) => {
                  return (
                    <div key={uuidv4()} className="flex gap-4">
                      <p>{chapter.date}</p>
                      <p>{chapter.number}</p>
                      <p>{chapter.sourceName}</p>
                      <p>{chapter.read ? "Read" : "Not Read"}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex column gap-2">
        <h3>See also</h3>
        <div className="flex gap-2">
          <Card
            imagePath="https://i.pinimg.com/736x/6a/36/95/6a36953e872c8470ecb3591273d70798.jpg"
            text="Manga Sample 1"
            color="text-primary"
            id={1}
          />
          <Card
            imagePath="https://static.wikia.nocookie.net/onepiece/images/c/c6/Volume_100.png"
            text="Manga Sample 2"
            color="text-primary"
            id={2}
          />
          <Card
            imagePath="https://cdna.artstation.com/p/assets/images/images/064/254/112/large/emerson-castro-capa-one-piece-c1000.jpg?1687463755"
            text="Manga Sample 3"
            color="text-primary"
            id={3}
          />
          <Card
            imagePath="https://wallpapers.com/images/hd/one-piece-4k-cover-art-ncfciduqxhppiukm.jpg"
            text="Manga Sample 4"
            color="text-primary"
            id={4}
          />
          <Card
            imagePath="https://64.media.tumblr.com/0bef5d2f8a22101a6e831ee8163b5aa5/6beedf0b421cf769-59/s1280x1920/4af301abfffc2f4b18b99f268b3a0a7e071b899a.jpg"
            text="Manga Sample 5"
            color="text-primary"
            id={5}
          />
        </div>
      </div>
    </div>
  ) : (
    <div>No data...</div>
  );
}

export default Manga;
