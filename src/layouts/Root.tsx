import { Outlet, Link } from "react-router-dom";
import Avatar from "../components/avatar/Avatar";
import "./Root.scss";
import Button from "../components/button/Button";

interface PageList {
  baseUrl: string;
  title: string;
}
const pages: PageList[] = [
  { baseUrl: "/", title: "Home" },
  { baseUrl: "/library", title: "Library" },
  { baseUrl: "/mylist", title: "My List" },
];
const isUserLogged = false;

function Root() {
  return (
    <>
      <div className={`roboto primary-light`}>
        <div
          className={`root-main flex align-center space-between`}
          style={{ height: 50, margin: "auto", width: "60vw" }}
        >
          <p>MANGA UPDATER</p>
          <div className="flex gap-4">
            {pages.map((page) => (
              <div className="fsize-5">
                <Link to={`${page.baseUrl}`}>{page.title}</Link>
              </div>
            ))}
          </div>
          {isUserLogged ? (
            <Avatar color="text-secondary" userName="" height={60} width={60} />
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={() => null}
                text="Login"
                variant="primary-dark"
              />
              <Button onClick={() => null} text="Register" variant="danger" />
            </div>
          )}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Root;
