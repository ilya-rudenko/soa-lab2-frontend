import "./Labwork.css";
import { useEffect, useState } from "react";

function Labwork({
  coordinates,
  creationDate,
  difficulty,
  discipline,
  id,
  minimalPoint,
  name,
}) {
  function mapDifficulty(difficulty) {
    // eslint-disable-next-line default-case
    switch (difficulty) {
      case "HOPELESS":
        return {
          name: "Hopeless",
          color: "rgba(238, 130, 238, 0.25)",
        };
      case "VERY_HARD":
        return {
          name: "Very hard",
          color: "rgba(255, 0, 0, 0.25)",
        };
      case "HARD":
        return {
          name: "Hard",
          color: "rgba(255, 165, 0, 0.25)",
        };
      case "EASY":
        return {
          name: "Easy",
          color: "rgba(0, 128, 0, 0.25)",
        };
      case "VERY_EASY":
        return {
          name: "Very easy",
          color: "rgba(0, 255, 255, 0.25)",
        };
    }
  }

  return (
    <div className="Labwork" key={id}>
      <div
        style={{ textWrap: "wrap", width: "70%", overflow: "hidden" }}
        title={name}
      >
        {name}
      </div>
      <div
        style={{
          border: "1px solid black",
          textAlign: "center",
          width: "70px",
          borderRadius: "10px",
          padding: "10px",
          backgroundColor: mapDifficulty(difficulty).color,
        }}
      >
        <div>{mapDifficulty(difficulty).name}</div>
      </div>
    </div>
  );
}

export default Labwork;
