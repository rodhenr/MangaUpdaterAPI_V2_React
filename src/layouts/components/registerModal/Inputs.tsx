import { ChangeEvent } from 'react';
import Input from '../../../components/input/Input';
import { RegisterDataType } from '../../Layouts.types';

type InputsTypeProps = {
  handleRegisterDataChange: (event: ChangeEvent<HTMLInputElement>) => void;
  registerData: RegisterDataType;
};

const Inputs: React.FC<InputsTypeProps> = ({ handleRegisterDataChange, registerData }) => {
  return (
    <div className="flex column gap-3">
      <div className="flex column gap-1">
        <label htmlFor="registerUsername">Username</label>
        <Input
          id="username"
          onChange={handleRegisterDataChange}
          placeholder="Enter your username"
          value={registerData.username}
          type="text"
          variant="bg-light"
        />
      </div>
      <div className="flex column gap-1">
        <label htmlFor="registerEmail">Email</label>
        <Input
          id="registerEmail"
          onChange={handleRegisterDataChange}
          placeholder="Enter your email"
          type="email"
          value={registerData.registerEmail}
          variant="bg-light"
        />
      </div>
      <div className="flex column gap-1">
        <label htmlFor="registerPassword">Password</label>
        <Input
          icon="circle-question"
          iconText="Must contain an uppercase character, a lowercase character, a digit, and a non-alphanumeric character and at least 8 characters"
          id="registerPassword"
          onChange={handleRegisterDataChange}
          placeholder="Enter your password"
          type="password"
          value={registerData.registerPassword}
          variant="bg-light"
        />
      </div>
      <div className="flex column gap-1">
        <label htmlFor="confirmRegisterPassword">Confirm password</label>
        <Input
          icon="circle-question"
          iconText="Must contain an uppercase character, a lowercase character, a digit, and a non-alphanumeric character and at least 8 characters"
          id="confirmationPassword"
          onChange={handleRegisterDataChange}
          placeholder="Enter your password"
          type="password"
          value={registerData.confirmationPassword}
          variant="bg-light"
        />
      </div>
    </div>
  );
};

export default Inputs;
