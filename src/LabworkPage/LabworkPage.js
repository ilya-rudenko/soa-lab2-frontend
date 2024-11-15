import "./LabworkPage.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { labworkService } from "../fetch";

function LabworkPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [labwork, setLabwork] = useState(null);

  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [minimalPoint, setMinimalPoint] = useState("");
  // const [creationDate, setCreationDate] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [faculty, setFaculty] = useState("");
  const [disciplineName, setDisciplineName] = useState("");
  const [selfStudyHours, setSelfStudyHours] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  const [error, setError] = useState(null);

  const [difficulties, setDifficulties] = useState([]);

  useEffect(() => {
    fetch(labworkService + "/labworks-service/api/v1/enums/difficulty")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDifficulties(data);

        fetch(labworkService + "/labworks-service/api/v1/labworks/" + id)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setLabwork(data);

            setName(data.name);
            setMinimalPoint(data.minimalPoint);
            // setCreationDate(data.creationDate);
            setDifficulty(data.difficulty);
            setFaculty(data.discipline.faculty);
            setDisciplineName(data.discipline.name);
            setSelfStudyHours(data.discipline.selfStudyHours);
            setX(data.coordinates.x);
            setY(data.coordinates.y);
          });
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") setError("No connection");
      });
  }, [error, editMode]);

  useEffect(() => {}, []);

  const handleMinpointInput = (event) => {
    if (Number(event.target.value)) {
      setMinimalPoint(event.target.value);
    } else if (event.target.value === "") setMinimalPoint("");
    else if (event.target.value === "0") setMinimalPoint("0");
  };

  const handleNameInput = (event) => setName(event.target.value);

  // const handleDateInput = (date) => setCreationDate(date);

  const handleDifficultyChange = (event) => setDifficulty(event.target.value);

  const handleFacultyChange = (event) => setFaculty(event.target.value);

  const handleDisciplineChange = (event) =>
    setDisciplineName(event.target.value);

  const handleSelfStudyHoursChange = (event) => {
    if (Number(event.target.value)) {
      setSelfStudyHours(event.target.value);
    } else if (event.target.value === "") setSelfStudyHours("");
    else if (event.target.value === "0") setSelfStudyHours("0");
  };

  const handleXChange = (event) => {
    if (Number(event.target.value)) {
      setX(event.target.value);
    } else if (event.target.value === "") setX("");
    else if (event.target.value === "0") setX("0");
  };
  const handleYChange = (event) => {
    if (Number(event.target.value)) {
      setY(event.target.value);
    } else if (event.target.value === "") setY("");
    else if (event.target.value === "0") setY("0");
  };

  const onApply = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        minimalPoint: minimalPoint,
        difficulty: difficulty,
        // creationDate: format(creationDate, "yyyy-MM-dd"),
        coordinates: {
          x: Number(x),
          y: Number(y),
        },
        discipline: {
          faculty: faculty,
          name: disciplineName,
          selfStudyHours: selfStudyHours,
        },
      }),
    };

    fetch(labworkService + "/labworks-service/api/v1/enums/difficulty")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        fetch(
          labworkService + "/labworks-service/api/v1/labworks/" + id,
          requestOptions,
        )
          .then(async (response) => {
            const data = await response.json();

            if (!response.ok) {
              return Promise.reject(data.messages[0]);
            }
            alert("Success!");
            setError(null);
            setEditMode(false);
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") setError("No connection");
      });
  };

  const onCancel = () => {
    setEditMode(false);
    setError(null);
  };

  const onEdit = () => setEditMode(true);

  const onDelete = () => {
    const requestOptions = { method: "DELETE" };

    fetch(labworkService + "/labworks-service/api/v1/enums/difficulty")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        fetch(
          labworkService + "/labworks-service/api/v1/labworks/" + id,
          requestOptions,
        )
          .then(async (response) => {
            navigate("/labworks", { replace: true });
            const data = await response.json();

            if (!response.ok) {
              return Promise.reject(data.messages[0]);
            }
            alert("Success!");
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") setError("No connection");
      });
  };

  return (
    <div className={"MainWrapper"}>
      {editMode ? (
        <EditMode
          labwork={labwork}
          name={name}
          minimalPoint={minimalPoint}
          // creationDate={creationDate}
          difficulty={difficulty}
          faculty={faculty}
          disciplineName={disciplineName}
          selfStudyHours={selfStudyHours}
          x={x}
          y={y}
          handleMinpointInput={handleMinpointInput}
          handleNameInput={handleNameInput}
          // handleDateInput={handleDateInput}
          difficulties={difficulties}
          handleDifficultyChange={handleDifficultyChange}
          handleFacultyChange={handleFacultyChange}
          handleDisciplineChange={handleDisciplineChange}
          handleSelfStudyHoursChange={handleSelfStudyHoursChange}
          handleXChange={handleXChange}
          handleYChange={handleYChange}
          onApply={onApply}
          onCancel={onCancel}
          error={error}
        />
      ) : (
        <ViewMode
          labwork={labwork}
          onEdit={onEdit}
          onDelete={onDelete}
          error={error}
        />
      )}
    </div>
  );
}

const EditMode = (props) => {
  const {
    labwork,
    name,
    minimalPoint,
    // creationDate,
    difficulty,
    faculty,
    disciplineName,
    selfStudyHours,
    x,
    y,
    handleNameInput,
    handleMinpointInput,
    // handleDateInput,
    difficulties,
    handleDifficultyChange,
    handleFacultyChange,
    handleDisciplineChange,
    handleSelfStudyHoursChange,
    handleXChange,
    handleYChange,
    onApply,
    onCancel,
    error,
  } = props;

  return (
    <div>
      <div
        className={"LabworkField"}
        style={{
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
        }}
      >
        LABWORK
      </div>
      <div className={"LabworkField"}>
        <div>ID</div>
        <div>{labwork ? labwork.id : null}</div>
      </div>
      <div className={"LabworkField"}>
        <div>Name</div>
        <input value={name} onChange={handleNameInput} />
      </div>
      <div className={"LabworkField"}>
        <div>Minimal point</div>{" "}
        <input value={minimalPoint} onChange={handleMinpointInput} />
      </div>
      {/*<div className={"LabworkField"}>*/}
      {/*  <div>Creation date</div>*/}
      {/*  <div>*/}
      {/*    <DatePicker*/}
      {/*      className={"DatePicker"}*/}
      {/*      showMonthDropdown*/}
      {/*      // locale="en-US"*/}
      {/*      showYearDropdown*/}
      {/*      dropdownMode="select"*/}
      {/*      dateFormat="dd-MM-yyyy"*/}
      {/*      selected={creationDate}*/}
      {/*      onChange={handleDateInput}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className={"LabworkField"}>
        <div>Difficulty</div>
        <select
          onChange={handleDifficultyChange}
          value={difficulty}
          style={{ width: "209px" }}
        >
          {difficulties.map((diff, id) => (
            <option key={"diff_" + id}>{diff.value}</option>
          ))}
        </select>
      </div>
      <div>
        <div className={"LabworkField"} style={{ fontWeight: "bold" }}>
          Discipline
        </div>
        <div style={{ marginLeft: "10px" }}>
          <div className={"LabworkField"}>
            <div>Faculty</div>
            <input value={faculty} onChange={handleFacultyChange} />
          </div>
          <div className={"LabworkField"}>
            <div>Discipline name</div>
            <input value={disciplineName} onChange={handleDisciplineChange} />
          </div>
          {/*<div className={"LabworkField"}>*/}
          {/*  <div>Self study hours</div>*/}
          {/*  <input*/}
          {/*    value={selfStudyHours}*/}
          {/*    onChange={handleSelfStudyHoursChange}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </div>
      <div>
        <div className={"LabworkField"} style={{ fontWeight: "bold" }}>
          Coordinates
        </div>
        <div style={{ marginLeft: "10px" }}>
          <div className={"LabworkField"}>
            <div>X</div>
            <input value={x} onChange={handleXChange} />
          </div>
          <div className={"LabworkField"}>
            <div>Y</div>
            <input value={y} onChange={handleYChange} />
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
          }}
        >
          {error}
        </div>
      )}
      <div className={"ButtonsWrapper"}>
        <button onClick={onApply}>Apply</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

const ViewMode = ({ labwork, onEdit, onDelete, error }) => {
  return (
    <div>
      <div
        className={"LabworkField"}
        style={{
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
        }}
      >
        LABWORK
      </div>
      <div className={"LabworkField"}>
        <div>ID</div>
        <div
          title={labwork ? labwork.id : null}
          style={{
            textWrap: "wrap",
            width: "70%",
            overflow: "hidden",
            textAlign: "right",
          }}
        >
          {labwork ? labwork.id : null}
        </div>
      </div>
      <div className={"LabworkField"}>
        <div>Name</div>
        <div
          style={{
            textWrap: "wrap",
            width: "70%",
            overflow: "hidden",
            textAlign: "right",
          }}
          title={labwork ? labwork.name : null}
        >
          {labwork ? labwork.name : null}
        </div>
      </div>
      <div className={"LabworkField"}>
        <div>Minimal point</div>{" "}
        <div
          style={{
            textWrap: "wrap",
            width: "70%",
            overflow: "hidden",
            textAlign: "right",
          }}
          title={labwork ? labwork.minimalPoint : null}
        >
          {labwork ? labwork.minimalPoint : null}
        </div>
      </div>
      <div className={"LabworkField"}>
        <div>Creation date</div>
        <div>{labwork ? labwork.creationDate : null}</div>
      </div>
      <div className={"LabworkField"}>
        <div>Difficulty</div>
        <div>{labwork ? labwork.difficulty : null}</div>
      </div>
      <div>
        <div className={"LabworkField"} style={{ fontWeight: "bold" }}>
          Discipline
        </div>
        <div style={{ marginLeft: "10px" }}>
          <div className={"LabworkField"}>
            <div>Faculty</div>
            <div
              style={{
                textWrap: "wrap",
                width: "70%",
                overflow: "hidden",
                textAlign: "right",
              }}
              title={labwork ? labwork.discipline.faculty : null}
            >
              {labwork ? labwork.discipline.faculty : null}
            </div>
          </div>
          <div className={"LabworkField"}>
            <div>Discipline name</div>
            <div
              style={{
                textWrap: "wrap",
                width: "70%",
                overflow: "hidden",
                textAlign: "right",
              }}
              title={labwork ? labwork.discipline.name : null}
            >
              {labwork ? labwork.discipline.name : null}
            </div>
          </div>
          <div className={"LabworkField"}>
            <div>Self study hours</div>
            <div
              style={{
                textWrap: "wrap",
                width: "70%",
                overflow: "hidden",
                textAlign: "right",
              }}
              title={labwork ? labwork.discipline.selfStudyHours : null}
            >
              {labwork ? labwork.discipline.selfStudyHours : null}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={"LabworkField"} style={{ fontWeight: "bold" }}>
          Coordinates
        </div>
        <div style={{ marginLeft: "10px" }}>
          <div className={"LabworkField"}>
            <div>X</div>
            <div
              style={{
                textWrap: "wrap",
                width: "70%",
                overflow: "hidden",
                textAlign: "right",
              }}
            >
              {labwork ? labwork.coordinates.x : null}
            </div>
          </div>
          <div className={"LabworkField"}>
            <div>Y</div>
            <div
              style={{
                textWrap: "wrap",
                width: "70%",
                overflow: "hidden",
                textAlign: "right",
              }}
            >
              {labwork ? labwork.coordinates.y : null}
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
          }}
        >
          {error}
        </div>
      )}
      <div className={"ButtonsWrapper"}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default LabworkPage;
