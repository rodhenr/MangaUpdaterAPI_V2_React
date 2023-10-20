import Card from "../../../components/card/Card";

function SeeAlso() {
  return (
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
  );
}

export default SeeAlso;
