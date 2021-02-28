import React from 'react';

import './layout.scss';

const Layout = (props) => {
  return (
    <React.Fragment>
      <div className="container-fluid" id="layout">
        <div className="row" style={{height: '100vh'}}>
          <div className="col-12 col-md-3 pl-0" style={{backgroundColor: '#212529'}}>
          <nav className="navbar navbar-expand-lg flex-column align-items-start">
          <a className="navbar-brand" href="#">Al-Jazeera</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto flex-column">
              <li>
                <a className="nav-link" href="#"><i className="fas fa-home d-inline-block mr-3"></i> Home</a>
              </li>
              <li>
                <a className="nav-link" href="#"><i className="fas fa-user-friends d-inline-block mr-3"></i> Classes</a>
              </li>
              <li>
                <a className="nav-link" href="#"><i className="fas fa-envelope-open-text d-inline-block mr-3"></i> Exams</a>
              </li>
              <li>
                <a className="nav-link" href="#"><i className="fas fa-money-bill d-inline-block mr-3"></i> Fee</a>
              </li>
              <li>
                <a className="nav-link" href="#"><i className="fas fa-calendar-check d-inline-block mr-3"></i> Attendance</a>
              </li>
            </ul>
          </div>
       </nav>
          </div>
          <div className="col-12 col-md-9 p-0">
            <div className="d-flex justify-content-end py-4" id="notifications-menu" style={{borderBottom: '1px solid #212529'}}>
            <span className="d-inline-block mr-3"><i className="fas fa-comment-alt d-inline-block mr-2"></i>Feedback? </span>
              <span><i className="fas fa-bell display-inline-block mr-3"></i></span>
              <span><i className="fas fa-question-circle display-inline-block mr-3"></i></span>
              <span><i className="fas fa-user display-inline-block mr-3"></i></span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Layout;