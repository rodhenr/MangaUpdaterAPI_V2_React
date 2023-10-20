interface Props {
  text: string;
}

function Synopsis({ text }: Props) {
  return (
    <div className="flex column gap-2">
      <h1 className="fsize-5">Synopsis</h1>
      <div className="secondary-light radius-2 p-4">
        <p className="text-justify">{text}</p>
      </div>
    </div>
  );
}

export default Synopsis;
