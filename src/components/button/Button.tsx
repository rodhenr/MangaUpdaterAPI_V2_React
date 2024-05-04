import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontSize, IPadding, SizeProps, Variant } from '../../interfaces/components';
import HorizontalLoading from '../loading/HorizontalLoading';
import './Button.scss';

type Props = {
  disabled?: boolean;
  fontSize?: FontSize;
  icon?: string | null;
  iconWidth?: string;
  loading?: boolean;
  mouseover?: boolean;
  onClick?: () => void;
  onClickIcon?: () => void;
  padding?: IPadding;
  text: string;
  useHover?: boolean;
  variant?: Variant;
};

type ButtonPropsType = Props & SizeProps;

const Button: React.FC<ButtonPropsType> = ({
  disabled = false,
  fontSize = 'fsize-4',
  height = '30px',
  icon = null,
  iconWidth = '20px',
  loading = false,
  mouseover = true,
  onClick = () => null,
  onClickIcon = () => null,
  padding = 'ph-2',
  text,
  useHover = false,
  variant = 'primary-light',
  width = '100%',
}) => {
  return (
    <div
      className={`${disabled ? `bg-disabled` : variant} ${
        useHover && !disabled ? `${variant}-hover` : ''
      } radius-1 flex-center roboto border-box text-center ${
        disabled ? '' : !mouseover ? '' : 'cursor-pointer'
      } ${!icon && padding}`}
      style={{ height: height, width: width }}
    >
      {loading ? (
        <div className="flex-center fsize-3">
          <HorizontalLoading />
        </div>
      ) : (
        <>
          <p
            className={`flex-center w-100 h-100 ${fontSize} ${icon && 'p-2'}  border-box`}
            onClick={onClick}
          >
            {text}
          </p>
          {icon && (
            <div className="flex-center gap-2 h-100 p-2 border-box" onClick={onClickIcon}>
              <div className="bg-light h-100 opacity-2" style={{ width: 1 }}></div>
              <FontAwesomeIcon
                icon={icon as IconProp}
                className="h-100 p-1"
                style={{ width: iconWidth }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Button;
