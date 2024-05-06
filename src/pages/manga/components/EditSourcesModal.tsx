import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import { queryClient } from '../../../api/query-client';
import Button from '../../../components/button/Button';
import ThemeContext from '../../../context/ThemeContext';
import { useFollowSourcesMutation } from '../api/Mutations';
import { useGetSourcesQuery } from '../api/Queries';
import '../styles/EditSourcesModal.scss';
import Alert from './Alert';

type EditSourcesModalPropsType = {
  mangaId: number;
  onClose: () => void;
  showModal: boolean;
};

const EditSourcesModal: React.FC<EditSourcesModalPropsType> = ({ mangaId, onClose, showModal }) => {
  const { themeMode } = useContext(ThemeContext);
  const [sourcesToFollow, setSourcesToFollow] = useState<number[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const { data, error, isPending } = useGetSourcesQuery(mangaId);
  const followSourcesMutation = useFollowSourcesMutation();

  useEffect(() => {
    if (data) {
      const sourcesIds = data.filter((i) => i.isUserFollowing).map((r) => r.id);

      setSourcesToFollow(sourcesIds);
    }
  }, [data]);

  const handleSourceChange = (sourceId: number) => {
    if (!followSourcesMutation.isPending) {
      !sourcesToFollow.includes(sourceId)
        ? setSourcesToFollow((prev) => [...prev, sourceId])
        : setSourcesToFollow((prev) => prev.filter((i) => i !== sourceId));
    }
  };

  const handleMutation = async () => {
    if (data && data.length > 0) {
      await followSourcesMutation.mutateAsync({ mangaId, sourcesToFollow });

      setShowDialog(true);
      closeModal();
    }
  };

  const closeModal = () => {
    queryClient.invalidateQueries({ queryKey: ['mangaData'] });
    onClose();
  };

  if (error) return 'error...';

  return (
    <div
      className="roboto bg-modal-back absolute absolute-align border-box"
      style={{
        display: !showModal ? 'none' : 'flex',
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      <div
        className={`editSources-main flex column gap-2 radius-1 shadow-3 ${
          themeMode === 'light' ? 'secondary-dark' : 'primary-dark'
        }`}
        style={{
          height: 180,
          width: 330,
        }}
      >
        <div className="flex align-center space-between">
          <h1 className="poppins fweight-2 fsize-5">Add/Remove Sources</h1>
          <FontAwesomeIcon
            className="fsize-5 cursor-pointer hover-opacity-1"
            icon="circle-xmark"
            onClick={closeModal}
          />
        </div>
        <div className="flex column flex-1">
          {isPending ? (
            <div>loading...</div>
          ) : data !== undefined ? (
            <>
              <div className="flex column flex-1 justify-center gap-2 flex-wrap">
                {data.length > 0 ? (
                  data.map((source) => (
                    <Button
                      fontSize="fsize-3"
                      height="20px"
                      key={uuidv4()}
                      onClick={() => handleSourceChange(source.id)}
                      text={source.name}
                      variant={
                        sourcesToFollow.includes(source.id) ? 'primary-light' : 'bg-disabled'
                      }
                      width="fit-content"
                    />
                  ))
                ) : (
                  <div>
                    <p>No sources available</p>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <Button
                  disabled={data.length > 0 && !followSourcesMutation.isPending ? false : true}
                  loading={followSourcesMutation.isPending ? true : false}
                  onClick={() => handleMutation()}
                  text="Update"
                  useHover={true}
                  variant={data.length > 0 ? 'success' : 'bg-disabled'}
                />
                <Button
                  disabled={followSourcesMutation.isPending ? true : false}
                  onClick={closeModal}
                  text="Cancel"
                  useHover={true}
                  variant={!followSourcesMutation.isPending ? 'danger' : 'bg-disabled'}
                />
              </div>
            </>
          ) : (
            <div>Error...</div>
          )}
        </div>
      </div>
      {showDialog &&
        createPortal(
          <Alert
            message="Sources updated"
            onClose={() => setShowDialog(false)}
            width={'350px'}
            variant={themeMode === 'light' ? 'bg-dark' : 'bg-light'}
          />,
          document.getElementById('manga-page')!
        )}
    </div>
  );
};

export default EditSourcesModal;
