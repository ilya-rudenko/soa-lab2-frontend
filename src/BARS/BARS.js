import "./BARS.css";
import { useEffect, useState } from "react";
import { barsService, labworkService } from "../fetch";

function BARS() {
  return (
    <div className={"CockpitContainer"}>
      <Increase />
      <Hardcore />
    </div>
  );
}

const Hardcore = () => {
  const [discipline, setDiscipline] = useState("");
  const [faculty, setFaculty] = useState("");
  const handleFacultyChange = (event) => setFaculty(event.target.value);

  const [error, setError] = useState(null);

  const handleDisciplineChange = (event) => setDiscipline(event.target.value);

  const handlePost = () => {
    const requestOptions = {
      method: "POST",
    };

    if (!discipline || !faculty) {
      setError("Missing fields");
      return;
    }

    fetch(barsService + "/bars-service/api/v1/bars/ping")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        fetch(
          barsService +
            "/bars-service/api/v1/bars/faculties/" +
            faculty +
            "/" +
            discipline +
            "/make-hardcore",
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
      <div className={"header2"}>Make Hardcore</div>
      <div className={"LabworkField"}>
        <div>Faculty</div>
        <input value={faculty} onChange={handleFacultyChange} />
      </div>
      <div className={"LabworkField"}>
        <div>Discipline</div>
        <input value={discipline} onChange={handleDisciplineChange} />
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

const Increase = () => {
  const [id, setId] = useState("");
  const [steps, setSteps] = useState("");

  const [error, setError] = useState(null);

  const handleIdChange = (event) => {
    if (Number(event.target.value)) {
      setId(event.target.value);
    } else if (event.target.value === "") setId("");
    else if (event.target.value === "0") setId("0");
  };
  const handleStepsChange = (event) => {
    if (Number(event.target.value)) {
      if (Math.abs(Number(event.target.value)) <= 6)
        setSteps(event.target.value);
    } else if (event.target.value === "") setSteps("");
    else if (event.target.value === "0") setSteps("0");
  };

  const handlePatch = () => {
    const requestOptions = {
      method: "PATCH",
      // headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({
      //   // name: faculty,
      // }),
    };

    if (!id || !steps) {
      setError("Missing fields");
      return;
    }

    fetch(barsService + "/bars-service/api/v1/bars/ping")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        fetch(
          barsService +
            "/bars-service/api/v1/bars/labworks/" +
            id +
            "/difficulty/increase/" +
            steps,
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
      <div className={"header2"}>Patch labwork</div>
      <div className={"LabworkField"}>
        <div>Id</div> <input value={id} onChange={handleIdChange} />
      </div>
      <div className={"LabworkField"}>
        <div>Steps</div>{" "}
        <input
          value={steps}
          onChange={handleStepsChange}
          placeholder={"6 max"}
        />
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
      <button onClick={handlePatch}>MAKE HARDER</button>
    </div>
  );
};

export default BARS;
