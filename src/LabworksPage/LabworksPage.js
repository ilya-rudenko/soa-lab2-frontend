import "./LabworksPage.css";
import Labwork from "../Labwork/Labwork";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "../App.css";
import { labworkService } from "../fetch";

export default LabworksPage;

function LabworksPage() {
  const [labworks, setLabworks] = useState([]);
  const [difficulties, setDifficulties] = useState([]);

  const [filterParameter, setFilterParameter] = useState("");
  const [filterOperator, setFilterOperator] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filters, setFilters] = useState([]);

  const [sortParameter, setSortParameter] = useState("");
  const [sortValue, setSortValue] = useState(false);
  const [sorts, setSorts] = useState([]);

  const [requestString, setRequestString] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [limit, setLimit] = useState(7);

  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(limit);
    fetch(labworkService + "/labworks-service/api/v1/enums/difficulty")
      .then(async (res) => {
        let response = await res.json();
        return response;
      })
      .then((data) => {
        setDifficulties(data);

        fetch(
          labworkService +
            "/labworks-service/api/v1/labworks?" +
            requestString +
            "&offset=" +
            currentPage * limit +
            "&limit=" +
            limit,
        )
          .then(async (response) => {
            const data = await response.json();

            if (!response.ok) {
              return Promise.reject(data.messages[0]);
            }

            setLabworks(data.elements);
            setTotalPages(Math.ceil(data.totalCount / limit));

            setError(null);
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        if (error.message === "Failed to fetch") setError("No connection");
      });
  }, [requestString, currentPage, limit]);

  const params = {
    id: "number",
    name: "string",
    coordinate_x: "number",
    coordinate_y: "number",
    creation_date: "date",
    minimal_point: "number",
    difficulty: "enum",
    discipline_name: "string",
    discipline_self_study_hours: "number",
  };

  const allOperators = {
    "<": "lt",
    "<=": "lte",
    ">": "gt",
    ">=": "gte",
    "=": "eq",
    "!=": "neq",
  };

  const stringOperators = {
    "<": "lt",
    "<=": "lte",
    ">": "gt",
    ">=": "gte",
    "=": "eq",
    "!=": "neq",
    like: "~",
  };

  const handleNumberInput = (event) => {
    if (Number(event.target.value)) {
      setFilterValue(event.target.value);
    } else if (event.target.value === "") setFilterValue("");
    else if (event.target.value === "0") setFilterValue("0");
  };

  const handleAddFilter = () => {
    if (filterParameter !== "" && filterOperator !== "" && filterValue !== "") {
      if (params[filterParameter] === "date")
        setFilters([
          ...filters,
          [filterParameter, filterOperator, format(filterValue, "yyyy-MM-dd")],
        ]);
      else
        setFilters([
          ...filters,
          [filterParameter, filterOperator, filterValue],
        ]);
    }
  };

  const handleAddSort = () => {
    if (sortParameter !== "") {
      setSorts([...sorts, [sortParameter, sortValue]]);
      // setSortValue(false);
    }
  };

  const parseFilters = (filters) => {
    let str = "";
    for (let i = 0; i < filters.length; i++) {
      if (i === 0) {
        str +=
          "filter=" +
          filters[i][0] +
          "[" +
          stringOperators[filters[i][1]] +
          "]=" +
          filters[i][2];
      } else {
        str +=
          "&filter=" +
          filters[i][0] +
          "[" +
          stringOperators[filters[i][1]] +
          "]=" +
          filters[i][2];
      }
    }

    return str;
  };

  const parseSorts = (sorts) => {
    let str = "";

    for (let i = 0; i < sorts.length; i++) {
      if (i === 0) {
        str += "sort=" + sorts[i][0] + (sorts[i][1] ? "[desc]" : "");
      } else {
        str += "&sort=" + sorts[i][0] + (sorts[i][1] ? "[desc]" : "");
      }
    }

    return str;
  };

  const handleApply = () => {
    let fstr = parseFilters(filters);
    let sstr = parseSorts(sorts);

    setRequestString(fstr + "&" + sstr);
    setCurrentPage(0);
  };

  const deleteFilter = (id) => {
    setFilters(filters.filter((_, i) => i !== id));
  };

  const deleteSort = (id) => {
    setSorts(sorts.filter((_, i) => i !== id));
  };

  const plusPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };
  const minusPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="wrapper">
      <div className="LabworksList">
        <div className="header">Labworks</div>
        <div>
          <div>Number of labworks on page</div>
          <select
            onChange={(event) => setLimit(event.target.value)}
            value={limit}
          >
            <option>3</option>
            <option>5</option>
            <option>7</option>
            <option>11</option>
            <option>13</option>
            <option>15</option>
          </select>
        </div>
        {labworks.map((labwork, i) => (
          <Link to={`/labworks/${labwork.id}`} className="Link">
            <Labwork key={i} {...labwork} />
          </Link>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button className={"addButton"} onClick={minusPage}>
            {"<"}
          </button>
          {totalPages === 0 ? (
            <div>0 / 0</div>
          ) : (
            <div>
              {currentPage + 1} / {totalPages}
            </div>
          )}

          <button className={"addButton"} onClick={plusPage}>
            {">"}
          </button>
        </div>
      </div>
      <div className="LabworksFilter">
        <div className="FilteringWrapper">
          <div className="header">Filter</div>
          <div className="innerWrapper">
            <AddFilters
              setFilterValue={setFilterValue}
              setFilterParameter={setFilterParameter}
              filterParameter={filterParameter}
              filterOperator={filterOperator}
              setFilterOperator={setFilterOperator}
              params={params}
              stringOperators={stringOperators}
              allOperators={allOperators}
              handleAddFilter={handleAddFilter}
              filterValue={filterValue}
              handleNumberInput={handleNumberInput}
              difficulties={difficulties}
            />
            <div>
              <div className={"header2"} style={{ marginTop: "10px" }}>
                Filters
              </div>
              <div className={"paramsList"}>
                {filters.map((filter, id) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "5px",
                      // width: "25%",
                    }}
                  >
                    <div>
                      {filter[0]} {filter[1]} {filter[2]}
                    </div>
                    <button
                      className="addButton"
                      onClick={() => deleteFilter(id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="header">Sort</div>
          <div className="innerWrapper">
            <AddSort
              setSortParameter={setSortParameter}
              sortParameter={sortParameter}
              params={params}
              sortValue={sortValue}
              setSortValue={setSortValue}
              handleAddSort={handleAddSort}
            />
            <div>
              <div className={"header2"} style={{ marginTop: "10px" }}>
                Sorting
              </div>
              <div className={"paramsList"}>
                {sorts.map((sort, id) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "5px",
                      // width: "25%",
                    }}
                  >
                    <div>
                      {sort[0]} - {sort[1] ? "Descending" : "Ascending"}
                    </div>
                    <button
                      className="addButton"
                      onClick={() => deleteSort(id)}
                      style={{ marginLeft: "5px" }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {error && (
          <div
            className={"LabworkField"}
            style={{
              backgroundColor: "red",
              borderRadius: "10px",
              margin: "5px",
              padding: "5px",
              width: "max-content",
            }}
          >
            {error}
          </div>
        )}
        <button
          className="addButton"
          onClick={handleApply}
          style={{ fontSize: "25px", marginTop: "10px" }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

const AddFilters = ({
  setFilterValue,
  setFilterParameter,
  filterParameter,
  filterOperator,
  setFilterOperator,
  params,
  stringOperators,
  allOperators,
  handleAddFilter,
  filterValue,
  handleNumberInput,
  difficulties,
}) => {
  return (
    <div className="addFiltersWrapper">
      <select
        onChange={(event) => {
          setFilterValue("");
          setFilterParameter(event.target.value);
        }}
        value={filterParameter}
      >
        <option hidden value="">
          parameter
        </option>
        {Object.entries(params).map(([key, value]) => (
          <option key={"parameter_" + key}>{key}</option>
        ))}
      </select>
      <select
        onChange={(event) => setFilterOperator(event.target.value)}
        value={filterOperator}
      >
        <option hidden value="">
          operator
        </option>
        {Object.entries(
          params[filterParameter] === "string" ? stringOperators : allOperators,
        ).map(([key, value]) => (
          <option key={"operator_" + key}>{key}</option>
        ))}
      </select>
      <InputField
        filterValue={filterValue}
        handleNumberInput={handleNumberInput}
        setFilterValue={setFilterValue}
        difficulties={difficulties}
        fieldType={
          filterOperator === "like" ? "string" : params[filterParameter]
        }
      />
      <button className="addButton" onClick={handleAddFilter}>
        Add
      </button>
    </div>
  );
};

const AddSort = ({
  setSortParameter,
  sortParameter,
  params,
  sortValue,
  setSortValue,
  handleAddSort,
}) => {
  return (
    <div className="addFiltersWrapper">
      <select
        onChange={(event) => {
          setSortParameter(event.target.value);
        }}
        value={sortParameter}
      >
        <option hidden value="">
          parameter
        </option>
        {Object.entries(params).map(([key, value]) => (
          <option key={"parameter_" + key}>{key}</option>
        ))}
      </select>
      <div>
        <input
          type="Checkbox"
          value={sortValue}
          onChange={(event) => {
            setSortValue(event.target.checked);
          }}
        />
        Descending
      </div>

      <button
        className="addButton"
        onClick={handleAddSort}
        style={{ marginLeft: "5px" }}
      >
        Add
      </button>
    </div>
  );
};

const InputField = ({
  fieldType,
  filterValue,
  handleNumberInput,
  setFilterValue,
  difficulties,
}) => {
  switch (fieldType) {
    case "number":
      return <input onChange={handleNumberInput} value={filterValue} />;
    case "date":
      return (
        <DatePicker
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          dateFormat="dd-MM-yyyy"
          selected={filterValue}
          onChange={(date) => setFilterValue(date)}
        />
      );
    case "enum":
      return (
        <select
          onChange={(event) => setFilterValue(event.target.value)}
          value={filterValue}
          style={{ width: "215px", height: "24px" }}
        >
          <option hidden value="">
            difficulty
          </option>
          {difficulties.map((diff, id) => (
            <option key={"diff_" + id}>{diff.value}</option>
          ))}
        </select>
      );
    default:
      return (
        <input
          onChange={(event) => setFilterValue(event.target.value)}
          value={filterValue}
        />
      );
  }
};
