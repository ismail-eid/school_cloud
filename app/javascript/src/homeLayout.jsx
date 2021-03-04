import React from 'react';
import {Link} from 'react-router-dom';

import './homeLayout.scss'

const Layout = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Dugsi Cloud</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about">About Us</Link>
            </li>
            <li className="nav-item">
             <Link to="/login">Login</Link>
            </li>
            <li className="nav-item">
             <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </div>
      </nav>

      {props.children}

      <footer className="p-3">
        <div>
          <p className="mr-3 mb-0 text-secondary">Dugsi Cloud <small>© Copyright 2021 Alif Cloud. All Rights Reserved.</small> - <small>Developed by <a href="">Ismail Eid</a></small> </p>
        </div>
      </footer>
    </React.Fragment>

  );

}

export default Layout;