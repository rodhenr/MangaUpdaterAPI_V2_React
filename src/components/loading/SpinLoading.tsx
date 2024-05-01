import './SpinLoading.scss';

const SpinLoading = () => {
  return (
    <div className="flex-center column gap-4 h-100 w-100">
      <span className="loader"></span>
      <p className="fsize-5">Loading...</p>
    </div>
  );
};

export default SpinLoading;
