import { useContext, useState } from 'react';

import ThemeContext from '../../shared/context/ThemeContext';

import './ProfileModal.scss';

interface IProps {
  closeModal: () => void;
  showModal: boolean;
}

function ProfileModal({ closeModal, showModal }: IProps) {
  const { themeMode } = useContext(ThemeContext);
  const [emailDisabled, setEmailDisabled] = useState<boolean>(true);
  const [changeEmailData, setChangeEmailData] = useState<{
    profileEmail: string;
    profilePassword: string;
    profileConfirmPassword: string;
  }>({ profileEmail: '', profilePassword: '', profileConfirmPassword: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return <div></div>;
  // //const { data, isError, isFetching } = useGetProfileData();
  // const { mutateAsync } = useChangeEmailMutation();

  // useEffect(() => {
  //   if (data?.email)
  //     setChangeEmailData((prev) => {
  //       return { ...prev, profileEmail: data.email };
  //     });
  // }, [data, setChangeEmailData]);

  // const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setErrorMessage(null);
  //   setSuccessMessage(null);
  //   const { name, value } = event.target;

  //   setChangeEmailData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const onCloseModal = () => {
  //   handleItemOnChange();
  //   setErrorMessage(null);
  //   setSuccessMessage(null);

  //   closeModal();
  // };

  // const handleItemOnChange = () => {
  //   setChangeEmailData({
  //     profilePassword: "",
  //     profileConfirmPassword: "",
  //     profileEmail: data?.email ?? "",
  //   });
  //   setEmailDisabled(!emailDisabled);
  // };

  // const handleUpdateEmail = async () => {
  //   try {
  //     await mutateAsync({
  //       newEmail: changeEmailData.profileEmail,
  //       password: changeEmailData.profilePassword,
  //       confirmationPassword: changeEmailData.profileConfirmPassword,
  //     });

  //     setSuccessMessage("Email changed!");
  //     handleItemOnChange();
  //   } catch (err) {
  //     const axiosError = err as AxiosError;
  //     setErrorMessage(axiosError.message);
  //   }
  // };

  // return (
  //   <div
  //     className={`profileModal-main flex column gap-4 radius-1 shadow-3 roboto space-around ${
  //       themeMode === "light" ? "secondary-dark" : "primary-dark"
  //     } poppins`}
  //     style={{
  //       display: !showModal ? "none" : "flex",
  //       left: "50%",
  //       position: "absolute",
  //       top: "50%",
  //       transform: "translate(-50%,-50%)",
  //     }}
  //   >
  //     <div className="flex column gap-4">
  //       <div className="flex align-center space-between">
  //         <h1 className="poppins fweight-2 fsize-4">Profile</h1>
  //         <FontAwesomeIcon
  //           className="fsize-5 cursor-pointer hover-opacity-1"
  //           icon="circle-xmark"
  //           onClick={() => onCloseModal()}
  //         />
  //       </div>
  //       <div className="flex flex-1 flex-center column gap-4">
  //         {isError ? (
  //           <p>Error</p>
  //         ) : isFetching ? (
  //           <SpinLoading />
  //         ) : data ? (
  //           <>
  //             <div className="flex gap-4">
  //               {data.avatar.length > 0 ? (
  //                 <img
  //                   src={
  //                     "https://i.pinimg.com/originals/cf/a6/04/cfa60461c22087bdc815e9140b96e600.jpg"
  //                   }
  //                   alt="user avatar"
  //                   style={{
  //                     border: `2px solid white`,
  //                     borderRadius: "50%",
  //                     height: 90,
  //                     width: 90,
  //                   }}
  //                 />
  //               ) : (
  //                 <div
  //                   style={{
  //                     backgroundColor: "white",
  //                     border: `2px solid black`,
  //                     borderRadius: "50%",
  //                     height: 90,
  //                     width: 90,
  //                   }}
  //                 ></div>
  //               )}
  //               <div className="flex column gap-2 flex-1">
  //                 <h1>{data.username}</h1>
  //                 <div className="flex column">
  //                   <h2 className="text-secondary-light fsize-4">User ID</h2>
  //                   <p>{data.userId}</p>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="flex column" style={{ width: "100%" }}>
  //               {errorMessage && (
  //                 <p className="fsize-5 text-danger">{errorMessage}</p>
  //               )}
  //               {successMessage && (
  //                 <p className="fsize-5 text-success">{successMessage}</p>
  //               )}
  //             </div>
  //             <div
  //               className="flex column flex-1 justify-center gap-3"
  //               style={{ width: "100%" }}
  //             >
  //               <div className="flex column gap-1">
  //                 <label
  //                   className="text-secondary-light"
  //                   htmlFor="profileEmail"
  //                 >
  //                   Email
  //                 </label>
  //                 <Input
  //                   disabled={emailDisabled}
  //                   icon="pen-to-square"
  //                   iconSide="right"
  //                   iconFn={() => handleItemOnChange()}
  //                   id="profileEmail"
  //                   onChange={handleOnChange}
  //                   placeholder="User email"
  //                   type="email"
  //                   value={changeEmailData.profileEmail}
  //                   variant="bg-light"
  //                 />
  //               </div>
  //               <div className="flex column gap-1">
  //                 <label
  //                   className="text-secondary-light"
  //                   htmlFor="profilePassword"
  //                 >
  //                   Password
  //                 </label>
  //                 <Input
  //                   disabled={emailDisabled}
  //                   id="profilePassword"
  //                   onChange={handleOnChange}
  //                   placeholder="Enter your password"
  //                   type="password"
  //                   value={changeEmailData.profilePassword}
  //                   variant="bg-light"
  //                 />
  //               </div>
  //               <div className="flex column gap-1">
  //                 <label
  //                   className="text-secondary-light"
  //                   htmlFor="profileConfirmPassword"
  //                 >
  //                   Confirm Password
  //                 </label>
  //                 <Input
  //                   disabled={emailDisabled}
  //                   id="profileConfirmPassword"
  //                   onChange={handleOnChange}
  //                   placeholder="Enter password confirmation"
  //                   type="password"
  //                   value={changeEmailData.profileConfirmPassword}
  //                   variant="bg-light"
  //                 />
  //               </div>
  //             </div>
  //             <div className="flex justify-end gap-2" style={{ width: "100%" }}>
  //               <Button
  //                 disabled={
  //                   changeEmailData.profileEmail.length === 0 ||
  //                   changeEmailData.profilePassword.length === 0 ||
  //                   changeEmailData.profileConfirmPassword.length === 0
  //                 }
  //                 onClick={async () => await handleUpdateEmail()}
  //                 text="Update"
  //                 variant="success"
  //                 width="100px"
  //               />
  //               <Button
  //                 onClick={onCloseModal}
  //                 text="Cancel"
  //                 variant="danger"
  //                 width="100px"
  //               />
  //             </div>
  //           </>
  //         ) : (
  //           <div>Etc</div>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default ProfileModal;
