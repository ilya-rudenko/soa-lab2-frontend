import "./Header.css";
import { Link } from "react-router-dom";
import "../App.css";

function Header() {
  return (
    <div className="Header">
      <div className="Wrapper">
        <div className="Routes">
          <Link to={"/labworks"} className="Link">
            <div className="Button">Labworks</div>
          </Link>
          <div
            style={{ padding: "10px", fontSize: "25px", fontWeight: "bold" }}
          >
            {" "}
            |
          </div>
          <Link to={"/cockpit"} className="Link">
            <div className="Button">Cockpit</div>
          </Link>
          <div
            style={{ padding: "10px", fontSize: "25px", fontWeight: "bold" }}
          >
            {" "}
            |
          </div>
          <Link to={"/faculties"} className="Link">
            <div className="Button">Faculties</div>
          </Link>
        </div>
        <Link to={"/BARS"} className="Link">
          <div className="Button">BARS</div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
