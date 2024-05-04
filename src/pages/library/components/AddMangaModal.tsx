import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useContext, useState } from 'react';
import Button from '../../../components/button/Button';
import Input from '../../../components/input/Input';
import ThemeContext from '../../../context/ThemeContext';
import { useAddMangaMutation } from '../api/Mutations';
import '../styles/AddMangaModal.scss';

interface Props {
  onClose: () => void;
}

const AddMangaModal = ({ onClose }: Props) => {
  const { themeMode } = useContext(ThemeContext);
  const [malId, setMalId] = useState<string>('');

  const [mutationError, setMutationError] = useState<string>('');
  const [mutationSuccess, setMutationSuccess] = useState<string>('');

  const { isPending, mutateAsync } = useAddMangaMutation();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMutationError('');
    setMalId(event.target.value);
  };

  const handleMutation = async () => {
    if (malId.length === 0) {
      setMutationError('Invalid ID');
      return;
    }

    try {
      await mutateAsync(malId);

      setMutationSuccess('Source added');

      setTimeout(() => {
        setMutationSuccess('');
        setMutationError('');
        onClose();
      }, 2000);
    } catch (err) {
      setMutationError('An error occurred');
    }
  };

  return (
    <div className="absolute absolute-align flex-center roboto zIndex-100 bg-modal-back h-100 w-100">
      <div
        className={`addManga-main flex column border-box radius-2 p-4 ${
          themeMode === 'light' ? 'secondary-dark' : 'primary-dark'
        } gap-3`}
        style={{ height: '200px', width: '400px' }}
      >
        <div className="flex space-between">
          <h1>Add new manga</h1>
          <FontAwesomeIcon
            className="fsize-5 cursor-pointer hover-opacity-1"
            icon="circle-xmark"
            onClick={onClose}
          />
        </div>
        <div className="flex gap-2">
          {mutationError && <p className="text-danger">{mutationError}</p>}
          {mutationSuccess && <p className="text-success">{mutationSuccess}</p>}
        </div>
        <div className="flex-center flex-1">
          <Input
            id="malId"
            onChange={handleOnChange}
            placeholder="MyAnimeList ID"
            value={malId}
            variant="bg-light"
          />
        </div>
        <div className="flex justify-center">
          <Button
            disabled={isPending}
            fontSize="fsize-3"
            onClick={async () => await handleMutation()}
            text="Add manga"
            useHover={true}
            variant="primary-light"
            width="170px"
          />
        </div>
      </div>
    </div>
  );
};

export default AddMangaModal;
