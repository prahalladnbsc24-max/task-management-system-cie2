import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Task Manager
        </Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/tasks">
            Tasks
          </Link>

          <Link className="nav-link" to="/add-task">
            Add Task
          </Link>

          <Link className="nav-link" to="/about">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;