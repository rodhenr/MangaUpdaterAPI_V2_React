import "./PageHeader.scss";

interface Props {
  children: React.ReactNode;
}

function PageHeader({ children }: Props) {
  return (
    <div className="pageHeader-main w-100 border-bottom-primary-light pb-1">
      {children}
    </div>
  );
}

export default PageHeader;
