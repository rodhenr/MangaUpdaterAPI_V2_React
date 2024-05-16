import noImageJpg from '../../assets/no-image.jpg';

const NoImage = () => {
  return (
    <div>
      <img src={noImageJpg} alt="no image found" />
    </div>
  );
};

export default NoImage;
