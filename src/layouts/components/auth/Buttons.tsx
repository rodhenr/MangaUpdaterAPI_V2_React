import Button from '../../../components/button/Button';
import useGetWindowWidth from '../../../hooks/useGetWindowWidth';

type Props = {
  changeLoginModalState: () => void;
  changeRegisterModalState: () => void;
};

const Buttons = ({ changeLoginModalState, changeRegisterModalState }: Props) => {
  const windowWidth = useGetWindowWidth();

  return (
    <div className={`flex gap-2 ${windowWidth > 600 ? 'row' : 'column'}`}>
      <Button
        height={windowWidth > 600 ? '30px' : '25px'}
        onClick={changeLoginModalState}
        text="Login"
        useHover={true}
        variant="secondary-light"
        width={windowWidth > 600 ? '100px' : '70px'}
      />
      <Button
        height={windowWidth > 600 ? '30px' : '25px'}
        onClick={changeRegisterModalState}
        text="Register"
        variant="primary-light"
        useHover={true}
        width={windowWidth > 600 ? '100px' : '70px'}
      />
    </div>
  );
};

export default Buttons;
