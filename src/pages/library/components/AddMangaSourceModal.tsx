import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useContext, useState } from 'react';
import Button from '../../../components/button/Button';
import Input from '../../../components/input/Input';
import SpinLoading from '../../../components/loading/SpinLoading';
import ThemeContext from '../../../context/ThemeContext';
import { useAddMangaSourceMutation } from '../api/Mutations';
import { useGetAllSourcesQuery } from '../api/Queries';
import SelectGroup from './SelectGroupt';

type AddMangaSourceModalPropsType = {
  onClose: () => void;
};

const AddMangaSourceModal: React.FC<AddMangaSourceModalPropsType> = ({ onClose }) => {
  const { themeMode } = useContext(ThemeContext);
  const [selectedMangaId, setSelectedMangaId] = useState<string>('');
  const [selectedSourceId, setSelectedSourceId] = useState<string>('1');
  const [url, setUrl] = useState<string>('');

  const [mutationError, setMutationError] = useState<string>('');
  const [mutationSuccess, setMutationSuccess] = useState<string>('');

  const { data, isFetching, error } = useGetAllSourcesQuery();
  const { isPending, mutateAsync } = useAddMangaSourceMutation();

  const handleMangaIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMutationError('');
    setSelectedMangaId(event.target.value);
  };

  const handleSourceIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMutationError('');
    setSelectedSourceId(event.target.value);
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMutationError('');
    setUrl(event.target.value);
  };

  const handleMutation = async () => {
    if (selectedMangaId.length === 0 || selectedSourceId.length === 0 || url.length === 0) return;

    try {
      await mutateAsync({
        mangaId: Number(selectedMangaId),
        sourceId: Number(selectedSourceId),
        url: url,
      });

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
    <div
      className="roboto"
      style={{
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      <div
        className={`addManga-main flex column border-box radius-2 p-4 ${
          themeMode === 'light' ? 'secondary-dark' : 'primary-dark'
        }`}
        style={{ height: '350px', width: '400px' }}
      >
        <div className="flex space-between">
          <h1>Add new manga source</h1>
          <FontAwesomeIcon
            className="fsize-5 cursor-pointer hover-opacity-1"
            icon="circle-xmark"
            onClick={onClose}
          />
        </div>
        <div className="flex column gap-4 justify-center flex-1">
          <div className="flex gap-2">
            {mutationError && <p className="text-danger">{mutationError}</p>}
            {mutationSuccess && <p className="text-success">{mutationSuccess}</p>}
          </div>
          {isFetching ? (
            <SpinLoading />
          ) : error ? (
            <div>Error</div>
          ) : (
            <>
              <div className="flex column gap-1">
                <SelectGroup
                  height="35px"
                  name="sources"
                  options={
                    data
                      ? data.map((el) => {
                          return {
                            description: el.name,
                            isHidden: false,
                            value: el.id.toString(),
                          };
                        })
                      : []
                  }
                  onChange={handleSourceIdChange}
                  placeholder="Select a source"
                  value={selectedSourceId}
                  lightVariant="bg-light"
                />
              </div>
              <div className="flex column gap-1">
                <label htmlFor="mangaId">Manga ID</label>
                <Input
                  id="mangaId"
                  onChange={handleMangaIdChange}
                  placeholder="Manga ID"
                  value={selectedMangaId}
                  variant="bg-light"
                />
              </div>
              <div className="flex column gap-1">
                <label htmlFor="url">Url</label>
                <Input
                  id="url"
                  onChange={handleUrlChange}
                  placeholder="URL"
                  value={url}
                  variant="bg-light"
                />
              </div>
            </>
          )}
        </div>
        <div className="flex justify-center">
          <Button
            disabled={
              selectedMangaId.length === 0 || selectedSourceId.length === 0 || url.length === 0
            }
            fontSize="fsize-3"
            loading={isPending}
            onClick={async () => await handleMutation()}
            text="Add manga source"
            useHover={true}
            variant="primary-light"
            width="170px"
          />
        </div>
      </div>
    </div>
  );
};

export default AddMangaSourceModal;
