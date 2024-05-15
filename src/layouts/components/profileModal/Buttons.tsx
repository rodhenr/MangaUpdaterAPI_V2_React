import Button from '../../../components/button/Button';
import '../../styles/ProfileModal.scss';

type ButtonPropsType = {
  changeEmailData: {
    profileEmail: string;
    profilePassword: string;
    profileConfirmPassword: string;
  };
  handleUpdateEmail: () => Promise<void>;
  onCloseModal: () => void;
};

const Buttons: React.FC<ButtonPropsType> = ({
  changeEmailData,
  handleUpdateEmail,
  onCloseModal,
}) => {
  return (
    <div className="flex justify-end gap-2" style={{ width: '100%' }}>
      <Button
        disabled={
          changeEmailData.profileEmail.length === 0 ||
          changeEmailData.profilePassword.length === 0 ||
          changeEmailData.profileConfirmPassword.length === 0
        }
        onClick={async () => await handleUpdateEmail()}
        text="Update"
        variant="success"
        width="100px"
        useHover={true}
      />
      <Button onClick={onCloseModal} text="Cancel" variant="danger" width="100px" useHover={true} />
    </div>
  );
};

export default Buttons;
