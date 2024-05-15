import { ChangeEvent } from 'react';
import Input from '../../../components/input/Input';
import '../../styles/ProfileModal.scss';

type InputsPropsType = {
  emailDisabled: boolean;
  handleItemOnChange: () => void;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  changeEmailData: {
    profileEmail: string;
    profilePassword: string;
    profileConfirmPassword: string;
  };
};

const Inputs: React.FC<InputsPropsType> = ({
  changeEmailData,
  emailDisabled,
  handleItemOnChange,
  handleOnChange,
}) => {
  return (
    <div className="flex column flex-1 justify-center gap-3" style={{ width: '100%' }}>
      <div className="flex column gap-1">
        <label className="text-secondary-light" htmlFor="profileEmail">
          Email
        </label>
        <Input
          disabled={emailDisabled}
          icon="pen-to-square"
          iconSide="right"
          iconFn={() => handleItemOnChange()}
          id="profileEmail"
          onChange={handleOnChange}
          placeholder="User email"
          type="email"
          value={changeEmailData.profileEmail}
          variant="bg-light"
        />
      </div>
      <div className="flex column gap-1">
        <label className="text-secondary-light" htmlFor="profilePassword">
          Password
        </label>
        <Input
          disabled={emailDisabled}
          id="profilePassword"
          onChange={handleOnChange}
          placeholder="Enter your password"
          type="password"
          value={changeEmailData.profilePassword}
          variant="bg-light"
        />
      </div>
      <div className="flex column gap-1">
        <label className="text-secondary-light" htmlFor="profileConfirmPassword">
          Confirm Password
        </label>
        <Input
          disabled={emailDisabled}
          id="profileConfirmPassword"
          onChange={handleOnChange}
          placeholder="Enter password confirmation"
          type="password"
          value={changeEmailData.profileConfirmPassword}
          variant="bg-light"
        />
      </div>
    </div>
  );
};

export default Inputs;
