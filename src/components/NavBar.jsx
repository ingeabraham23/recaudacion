import { Link } from "react-router-dom";
import "./NavBar.css";
import { faCirclePlus,  faCloudUpload, faDatabase, faEdit, faTableList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navigationItems = [
  { path: "/", label: "vista", icon: faTableList },
  { path: "/edicion", label: "edicion", icon: faEdit },
  { path: "/agregar", label: "agregar", icon: faCirclePlus },
  { path: "/cargar", label: "cargar", icon: faDatabase },
  { path: "/respaldar", label: "respaldar", icon: faCloudUpload },
];

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {navigationItems.map((item) => (
          <li className="nav-item" key={item.path}>
            <Link to={item.path} className="nav-link">
              <FontAwesomeIcon
                icon={item.icon}
                size="2x"
                style={{ fontSize: "24px" }}
              />{" "}
              {/* Renderiza el icono de Font Awesome */}{" "}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
