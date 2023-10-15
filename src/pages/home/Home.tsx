import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/button/Button";
import PageHeader from "../../components/pageHeader/PageHeader";
import { fakeData } from "../../api/fakeData/data";
import CardWithInfo from "../../components/card/CardWithInfo";

const isUserLogged = true;

function Home() {
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
        <div className="flex space-between w-100">
          <p className="fsize-5">Updates</p>
          <div className="flex gap-3">
            <FontAwesomeIcon icon="bars" className="fsize-5 cursor-pointer" />
            <FontAwesomeIcon icon="list" className="fsize-5 cursor-pointer" />
          </div>
        </div>
      </PageHeader>
    </div>
  );

  return (
    <div className="flex column gap-4 h-100 w-100">
      {!isUserLogged ? (
        <>{notLogged}</>
      ) : (
        <>
          {pageHeader}
          <div className="flex gap-4 space-between flex-wrap">
            {fakeData.map((data) => {
              return (
                <CardWithInfo
                  buttonVariant="primary-dark"
                  name={data.Name}
                  cover={data.CoverUrl}
                  chapters={data.Chapters}
                  width={275}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
