import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, memo, useState } from "react";
import "./MultiSelect.style.scss";

export interface IMultiSelect {
    id: number;
    value: any;
    toString: () => string;
}

function MultiSelectElement(props: {
    all: IMultiSelect[];
    selected: number[];
    select: (toSelect: number[]) => void;
}) {
    const { all, selected, select } = props;
    const [search, setSearch] = useState("");
    const [showOptions, setShowOptions] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setShowOptions(true);
    };

    const handleShowOptions = () => {
        setShowOptions((prev) => !prev);
    };

    const handleClickAddSelected = (id: number) => {
        const newSelected = [...selected, id].sort();
        select(newSelected);
    };

    const handleClickDeleteSelected = (id: number) => {
        const newSelected = selected.filter((el) => {
            if (el === id) {
                return false;
            }
            return true;
        });
        select(newSelected);
    };

    return (
        <div className="multi-select">
            <div className="multi-select-selected">
                {all
                    .filter((el) => {
                        if (selected.includes(el.id)) return true;
                        return false;
                    })
                    .map((el) => {
                        return (
                            <span
                                className="selected-element"
                                key={`[selected data] = ${el.id}}`}
                            >
                                {el.toString()}
                                <span
                                    className="btn selected-delete-btn"
                                    onClick={() =>
                                        handleClickDeleteSelected(el.id)
                                    }
                                >
                                    X
                                </span>
                            </span>
                        );
                    })}
            </div>
            <div className="multi-select-search">
                <label htmlFor="search"></label>
                <input
                    id="search"
                    name="search"
                    value={search}
                    placeholder="search..."
                    onChange={handleChange}
                />
                <span className="show" onClick={handleShowOptions}>
                    {showOptions ? (
                        <FontAwesomeIcon icon={faArrowUp} />
                    ) : (
                        <FontAwesomeIcon icon={faArrowDown} />
                    )}
                </span>
            </div>
            <div
                className="multi-select-options"
                style={{ padding: showOptions ? "5px 0" : "0px" }}
            >
                {showOptions
                    ? all
                          .filter((el) => {
                              if (
                                  el
                                      .toString()
                                      .toLowerCase()
                                      .match(search.toLowerCase())
                              )
                                  return true;
                              return false;
                          })
                          .filter((el) => {
                              if (selected.includes(el.id)) return false;
                              return true;
                          })
                          .map((el) => {
                              return (
                                  <span
                                      key={`[add data] = ${el.id}}`}
                                      onClick={() =>
                                          handleClickAddSelected(el.id)
                                      }
                                  >
                                      {el.toString()}
                                  </span>
                              );
                          })
                    : ""}
            </div>
        </div>
    );
}
const MultiSelect = memo(MultiSelectElement);
export default MultiSelect;
