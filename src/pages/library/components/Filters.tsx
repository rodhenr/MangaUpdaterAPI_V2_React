import { ChangeEvent } from "react";

import SelectGroup from "../../../components/select/SelectGroupt";
import { IFilters } from "../../../shared/interfaces/library";

interface Props {
  filters: IFilters;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function Filters({ filters, onChange }: Props) {
  return (
    <div className="flex gap-3">
      <SelectGroup
        name={"orderById"}
        onChange={onChange}
        options={[
          {
            description: "Order By",
            value: "0",
            isHidden: true,
          },
          {
            description: "A-Z",
            value: "1",
            isHidden: false,
          },
          {
            description: "Latest",
            value: "2",
            isHidden: false,
          },
        ]}
        value={filters.orderById}
      />
      <SelectGroup
        name={"sourceId"}
        onChange={onChange}
        options={[
          {
            description: "Source",
            value: "0",
            isHidden: true,
          },
          {
            description: "MangaLivre",
            value: "1",
            isHidden: false,
          },
          {
            description: "AsuraScans",
            value: "2",
            isHidden: false,
          },
        ]}
        value={filters.sourceId}
      />
      <SelectGroup
        name={"genreId"}
        onChange={onChange}
        options={[
          {
            description: "Genre",
            value: "0",
            isHidden: true,
          },
          {
            description: "Comedy",
            value: "1",
            isHidden: false,
          },
          {
            description: "Adventure",
            value: "2",
            isHidden: false,
          },
        ]}
        value={filters.genreId}
      />
    </div>
  );
}

export default Filters;
