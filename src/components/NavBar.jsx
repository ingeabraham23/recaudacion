import { Link } from 'react-router-dom';
import './NavBar.css';

const navigationItems = [
  { path: '/', label: 'vista' },
  { path: '/edicion', label: 'edicion' },
  { path: '/agregar', label: 'agregar' },
  { path: '/cargar', label: 'cargar' },
];

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {navigationItems.map((item) => (
          <li className="nav-item" key={item.path}>
            <Link to={item.path} className="nav-link">{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;