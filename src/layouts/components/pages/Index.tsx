import { Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { IPageList } from '../../../interfaces/components';
import '../../styles/PageGroup.scss';

const pages: IPageList[] = [
  { baseUrl: '/', title: 'Home' },
  { baseUrl: '/library', title: 'Library' },
];

const PageGroup = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex gap-4">
      {pages.map((page) => (
        <div key={uuidv4()} className="pageGroup-main">
          <Link
            to={`${page.baseUrl}`}
            className={pathname === page.baseUrl ? 'text-secondary-light' : 'text-secondary'}
          >
            {page.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PageGroup;
