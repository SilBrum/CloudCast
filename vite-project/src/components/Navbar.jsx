import { Link } from 'react-router-dom';
import './Navbar.css';
import UnitToggle from './UnitToggle';

function Navbar({ onUnitChange }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">CloudCast</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
}

export default Navbar;
