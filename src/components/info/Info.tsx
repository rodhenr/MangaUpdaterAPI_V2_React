import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Info.scss";

interface Props {
  description: string;
  header: string;
  icon: IconProp;
}

function Info({ description, icon, header }: Props) {
  return (
    <div className="info-main flex align-center gap-4 w-100 primary-light radius-2 border-box roboto">
      <div
        className="flex-center bg-light radius-2"
        style={{ height: 40, width: 40 }}
      >
        <FontAwesomeIcon
          icon={icon}
          className="fsize-5"
          style={{ color: "#454444" }}
        />
      </div>
      <div className="flex column flex-1">
        <p className="fsize-4">{header}</p>
        <p className="fsize-5 bold">{description}</p>
      </div>
    </div>
  );
}

export default Info;
