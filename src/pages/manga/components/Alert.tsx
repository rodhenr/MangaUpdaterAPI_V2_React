import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VariantType } from '../../../components/Components.types';

type AlertPropsType = {
  height?: string;
  message: string;
  onClose: () => void;
  width?: string;
  variant?: VariantType;
};

const Alert: React.FC<AlertPropsType> = (props) => {
  return (
    <div
      className={`flex-center space-between absolute p-4 radius-2 ${props.variant}`}
      style={{
        height: props.height,
        left: '50%',
        opacity: 0.9,
        transform: 'translate(-50%, 0%)',
        width: props.width,
      }}
    >
      <p>{props.message}</p>
      <FontAwesomeIcon
        className="fsize-5 cursor-pointer hover-opacity-1"
        icon="circle-xmark"
        onClick={props.onClose}
      />
    </div>
  );
};

export default Alert;
