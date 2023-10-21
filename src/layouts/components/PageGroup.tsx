import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { IPageList } from "../../shared/interfaces/components";

const pages: IPageList[] = [
  { baseUrl: "/", title: "Home" },
  { baseUrl: "/library", title: "Library" },
  { baseUrl: "/mylist", title: "My List" },
];

function PageGroup() {
  const { pathname } = useLocation();

  return (
    <div className="flex gap-4">
      {pages.map((page) => (
        <div key={uuidv4()} className="fsize-5">
          <Link
            to={`${page.baseUrl}`}
            className={
              pathname === page.baseUrl
                ? "text-secondary-light"
                : "text-secondary"
            }
          >
            {page.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PageGroup;
