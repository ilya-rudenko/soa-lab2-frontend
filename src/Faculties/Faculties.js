import { useEffect, useState } from "react";
import { labworkService } from "../fetch";

const Faculties = () => {
  const [disciplines, setDisciplines] = useState([]);
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetch(labworkService + "/labworks-service/api/v1/faculties/disciplines")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setDisciplines(data.elements);
      })
      .catch((err) => {
        // if (err.message === "Failed to fetch") setError("No connection");
      });

    fetch(labworkService + "/labworks-service/api/v1/faculties")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setFaculties(data.elements);
      })
      .catch((err) => {
        // if (err.message === "Failed to fetch") setError("No connection");
      });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className={"MainWrapper"}>
        <div className={"header"}>Faculties</div>
        <div>
          {faculties.map((d) => {
            return (
              <div style={{ padding: "5px" }}>
                <div
                  className={"header2"}
                  style={{
                    textWrap: "wrap",
                    width: "70%",
                    overflow: "hidden",
                    textAlign: "left",
                    padding: "5px",
                  }}
                  title={d.name ? d.name : null}
                >
                  {d.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={"MainWrapper"}>
        <div className={"header"}>Faculties and disciplines</div>
        <div>
          {disciplines.map((d) => {
            return (
              <div style={{ padding: "5px" }}>
                <div
                  style={{
                    textWrap: "wrap",
                    width: "70%",
                    overflow: "hidden",
                    textAlign: "left",
                    padding: "5px",
                  }}
                  title={d.name ? d.name : null}
                >
                  Discipline: {d.name}
                </div>
                <div
                  style={{
                    textWrap: "wrap",
                    width: "70%",
                    overflow: "hidden",
                    textAlign: "left",
                    padding: "5px",
                  }}
                  title={d.faculty ? d.faculty : null}
                >
                  Faculty: {d.faculty}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faculties;
