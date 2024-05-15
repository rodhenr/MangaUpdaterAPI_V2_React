import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/ProfileModal.scss';

type HeaderPropsType = {
  onCloseModal: () => void;
};

const Header: React.FC<HeaderPropsType> = ({ onCloseModal }) => {
  return (
    <div className="flex align-center space-between">
      <h1 className="poppins fweight-4 fsize-5">Profile</h1>
      <FontAwesomeIcon
        className="fsize-5 cursor-pointer hover-opacity-1"
        icon="circle-xmark"
        onClick={() => onCloseModal()}
      />
    </div>
  );
};

export default Header;
