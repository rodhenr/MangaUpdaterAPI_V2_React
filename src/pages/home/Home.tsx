import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { fakeData } from "../../api/fakeData/data";
import Button from "../../components/button/Button";
import PageHeader from "../../components/pageHeader/PageHeader";
import ListView from "./components/ListView";
import CardView from "./components/CardView";
import AuthContext from "../../shared/context/AuthContext";

function Home() {
  const [isCardView, setIsCardView] = useState<boolean>(true);
  const authContext = useContext(AuthContext);

  const notLogged = (
    <div className="flex-center column gap-2">
      <p className="fsize-6">Login to start following mangas</p>
      <div className="flex-center gap-2">
        <Button onClick={() => null} text="Login" variant="primary-dark" />
        <Button onClick={() => null} text="Register" variant="danger" />
      </div>
    </div>
  );

  const pageHeader = (
    <div className="w-100">
      <PageHeader>
        <div className="flex space-between w-100 align-end">
          <p className="fsize-5">Updates</p>
          <div className="flex gap-3">
            <FontAwesomeIcon
              icon="bars"
              className={`fsize-5 ${
                isCardView
                  ? "text-disabled"
                  : "cursor-pointer text-secondary-dark"
              }`}
              onClick={() => setIsCardView(true)}
            />
            <FontAwesomeIcon
              icon="list"
              className={`fsize-5 ${
                isCardView
                  ? "cursor-pointer text-secondary-dark"
                  : "text-disabled"
              }`}
              onClick={() => setIsCardView(false)}
            />
          </div>
        </div>
      </PageHeader>
    </div>
  );

  return (
    <div className="flex column gap-4 h-100 w-100">
      {!authContext.userInfo.token ? (
        <>{notLogged}</>
      ) : (
        <>
          {pageHeader}
          {isCardView ? (
            <CardView data={fakeData} />
          ) : (
            <ListView data={fakeData} />
          )}
        </>
      )}
    </div>
  );
}

export default Home;
