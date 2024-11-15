import "./Cockpit.css";
import { useEffect, useState } from "react";
import { labworkService } from "../fetch";

function Cockpit() {
  return (
    <div className={"CockpitContainer"}>
      <PostLabwork />

      <div className={"CockpitContainer2"}>
        <MinPointsSum />
        <PostFaculty />
        <PostDiscipline />
        <DeleteDisciplineLabworks />
      </div>
    </div>
  );
}

const DeleteDisciplineLabworks = () => {
  const [faculty, setFaculty] = useState("");
  const [disciplineName, setDisciplineName] = useState("");

  const [error, setError] = useState(null);

  const handleFacultyChange = (event) => setFaculty(event.target.value);

  const handleDisciplineChange = (event) =>
    setDisciplineName(event.target.value);

  const handleDelete = () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    if (!faculty || !disciplineName) {
      setError("Missing fields");
      return;
    }

    fetch(labworkService + "/labworks-service/api/v1/enums/difficulty")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        fetch(
          labworkService +
            "/labworks-service/api/v1/faculties/" +
            faculty +
            "/" +
            disciplineName +
            "/labworks",
          requestOptions,
        )
          .then(async (response) => {
            const res = await response;

            if (!res.ok) {
              let data = await res.json();
              return Promise.reject(data.messages[0]);
            }

            alert("Success!");
            setError(null);
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
    <div className={"wrapper2"}>
      <div className={"header2"}>Delete discipline labworks</div>
      <div style={{ marginLeft: "10px" }}>
        <div className={"LabworkField"}>
          <div>Faculty</div>
          <input value={faculty} onChange={handleFacultyChange} />
        </div>
        <div className={"LabworkField"}>
          <div>Discipline name</div>
          <input value={disciplineName} onChange={handleDisciplineChange} />
        </div>
      </div>
      <div>
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
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

const PostDiscipline = () => {
  const [faculty, setFaculty] = useState("");
  const [disciplineName, setDisciplineName] = useState("");
  const [selfStudyHours, setSelfStudyHours] = useState("120");

  const [error, setError] = useState(null);

  const handleFacultyChange = (event) => setFaculty(event.target.value);

  const handleDisciplineChange = (event) =>
    setDisciplineName(event.target.value);

  const handleSelfStudyHoursChange = (event) => {
    if (Number(event.target.value)) {
      if (Math.abs(Number(event.target.value)) < 10000)
        setSelfStudyHours(event.target.value);
    } else if (event.target.value === "") setSelfStudyHours("");
    else if (event.target.value === "0") setSelfStudyHours("0");
  };

  const handlePost = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        faculty: faculty,
        name: disciplineName,
        selfStudyHours: selfStudyHours,
      }),
    };

    if (!faculty || !disciplineName || !selfStudyHours) {
      setError("Missing fields");
      return;
    }

    fetch(labworkService + "/labworks-service/api/v1/enums/difficulty")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        fetch(
          labworkService + "/labworks-service/api/v1/faculties/disciplines",
          requestOptions,
        )
          .then(async (response) => {
            const data = await response.json();

            if (!response.ok) {
              return Promise.reject(data.messages[0]);
            }

            alert("Success!");
            setError(null);
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
    <div className={"wrapper2"}>
      <div className={"header2"}>Add discipline</div>
      <div style={{ marginLeft: "10px" }}>
        <div className={"LabworkField"}>
          <div>Faculty</div>
          <input value={faculty} onChange={handleFacultyChange} />
        </div>
        <div className={"LabworkField"}>
          <div>Discipline name</div>
          <input value={disciplineName} onChange={handleDisciplineChange} />
        </div>
        <div className={"LabworkField"}>
          <div>Self study hours</div>
          <input
            value={selfStudyHours}
            onChange={handleSelfStudyHoursChange}
            placeholder={"9999 max"}
          />
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
      <button onClick={handlePost}>Add</button>
    </div>
  );
};

const PostFaculty = () => {
  const [faculty, setFaculty] = useState("");

  const [error, setError] = useState(null);

  const handleFacultyChange = (event) => setFaculty(event.target.value);

  const handlePost = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: faculty,
      }),
    };

    if (!faculty) {
      setError("Missing fields");
      return;
    }

    fetch(labworkService + "/labworks-service/api/v1/enums/difficulty")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        fetch(
          labworkService + "/labworks-service/api/v1/faculties",
          requestOptions,
        )
          .then(async (response) => {
            const data = await response.json();

            if (!response.ok) {
              return Promise.reject(data.messages[0]);
            }

            alert("Success!");

            setError(null);
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
    <div className={"wrapper2"}>
      <div className={"header2"}>Add faculty</div>
      <div className={"LabworkField"}>
        <div>Faculty</div>
        <input value={faculty} onChange={handleFacultyChange} />
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
      <button onClick={handlePost}>Add</button>
    </div>
  );
};

const MinPointsSum = () => {
  const [sum, setSum] = useState(0);

  useEffect(() => {
    fetch(labworkService + "/labworks-service/api/v1/minimal-points/sum")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSum(data.value);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className={"wrapper2"}>
      <div className={"header2"} title={sum ? sum : "undefined"}>
        Minimal points sum: {sum ? sum : "undefined"}
      </div>
    </div>
  );
};

const PostLabwork = () => {
  const [name, setName] = useState("");
  const [minimalPoint, setMinimalPoint] = useState("0");
  // const [creationDate, setCreationDate] = useState(Date.now());
  const [difficulty, setDifficulty] = useState("very_easy");
  const [faculty, setFaculty] = useState("");
  const [disciplineName, setDisciplineName] = useState("");
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
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") setError("No connection");
      });
  }, []);

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

  const handlePost = () => {
    const requestOptions = {
      method: "POST",
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
        },
      }),
    };

    fetch(labworkService + "/labworks-service/api/v1/enums/difficulty")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        fetch(
          labworkService + "/labworks-service/api/v1/labworks/",
          requestOptions,
        )
          .then(async (response) => {
            const data = await response.json();

            if (!response.ok) {
              return Promise.reject(data.messages[0]);
            }

            alert("Success!");

            setError(null);
          })
          .catch((error) => {
            if (error.message === "Failed to fetch") setError("No connection");
            setError(error);
          });
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") setError("No connection");
      });
  };

  return (
    <div className={"wrapper2"}>
      <div className={"header2"}>New labwork</div>
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
      <button onClick={handlePost}>Add</button>
    </div>
  );
};

export default Cockpit;
