import { ChangeEvent, KeyboardEvent } from 'react';
import Input from '../../../components/input/Input';

type Props = {
  handleLoginDataChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  email: string;
  password: string;
};

const Inputs = ({ handleLoginDataChange, handleKeyDown, email, password }: Props) => {
  return (
    <div className="flex column gap-3">
      <div className="flex column">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          onChange={handleLoginDataChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter your email"
          type="email"
          value={email}
          variant="bg-light"
        />
      </div>
      <div className="flex column">
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          onChange={handleLoginDataChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter your password"
          minLength={8}
          type="password"
          value={password}
          variant="bg-light"
        />
      </div>
    </div>
  );
};

export default Inputs;
