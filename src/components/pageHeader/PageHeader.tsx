type PageHeaderPropsType = {
  children: React.ReactNode;
};

const PageHeader: React.FC<PageHeaderPropsType> = ({ children }) => {
  return <div className="w-100 border-bottom-primary-light pb-1">{children}</div>;
};

export default PageHeader;
