import { Link } from "react-router-dom";
import './Navbar.css'; // Optional: use if you want to extract styles

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold d-flex align-items-center">
          <span className="me-2">🎨</span> AI Resume Builder
        </span>

        <div className="d-flex gap-3">
          <Link to="/login" className="btn btn-outline-light fw-semibold">Login</Link>
          <Link to="/register" className="btn btn-primary fw-semibold">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
