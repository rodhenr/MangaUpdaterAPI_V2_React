import '../../styles/ProfileModal.scss';

type MessagesPropsType = {
  error: string | null;
  successMessage: string | null;
};

const Messages: React.FC<MessagesPropsType> = ({ error, successMessage }) => {
  return (
    <div className="flex column" style={{ width: '100%' }}>
      {error && <p className="fsize-5 text-danger">{error}</p>}
      {successMessage && <p className="fsize-5 text-success">{successMessage}</p>}
    </div>
  );
};

export default Messages;
