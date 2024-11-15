import "./Home.css";
import { useEffect } from "react";
import { labworkService } from "../fetch";
// import welcome from 'public/welcome.jpg';

function Home() {
  useEffect(() => {
    fetch(labworkService + "/labworks-service/api/v1/enums/difficulty")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("success");
      })
      .catch((err) => {
        // if (err.message === "Failed to fetch") setError("No connection");
      });
  }, []);

  return (
    <div className="Home">
      <div>Welcome to SOA Lab#2</div>
      <img style={{ padding: "20px" }} src={"/welcome.jpg"} />
    </div>
  );
}

// faculty -> discipline -> labwork

export default Home;
