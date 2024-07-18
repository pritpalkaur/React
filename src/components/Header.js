import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">TaskUp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/projects/projects">Project</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/charts/chart">Dashboard</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link text-dark" to="/teams">Teams</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
