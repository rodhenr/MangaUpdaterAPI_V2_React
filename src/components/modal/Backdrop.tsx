type BackdropPropsType = {
  children: React.ReactNode;
};

const Backdrop: React.FC<BackdropPropsType> = ({ children }) => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 999,
    }}
  >
    {children}
  </div>
);

export default Backdrop;
