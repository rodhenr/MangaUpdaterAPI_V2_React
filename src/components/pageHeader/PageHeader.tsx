import './PageHeader.scss';

type Props = {
  children: React.ReactNode;
};

const PageHeader = ({ children }: Props) => {
  return <div className="pageHeader-main w-100 border-bottom-primary-light pb-1">{children}</div>;
};

export default PageHeader;
