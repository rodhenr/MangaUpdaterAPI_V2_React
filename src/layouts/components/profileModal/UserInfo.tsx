import { UserProfileType } from '../../Layouts.types';
import '../../styles/ProfileModal.scss';

type UserInfoPropsType = { data: UserProfileType };

const UserInfo: React.FC<UserInfoPropsType> = ({ data }) => {
  return (
    <div className="flex gap-4 flex-1" style={{ alignSelf: 'start' }}>
      <div
        style={{
          backgroundColor: 'white',
          border: `2px solid black`,
          borderRadius: '50%',
          height: 90,
          width: 90,
        }}
      ></div>
      <div className="flex column gap-4 flex-1">
        <h1>{data.name}</h1>
        <div className="flex column">
          <h2 className="text-secondary-light fsize-3">User ID</h2>
          <p className="fsize-3">{data.id}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
