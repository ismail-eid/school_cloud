import React from 'react';
import { Link } from 'react-router-dom';
import LoadingWidget from '@util/loading';
import {safeCredentials, handleErrors} from '@util/fetchHelper';

import './layout.scss';

class Layout extends React.Component {

  state = {
    loading: true,
    school_name: '',
    user_full_name: '',
    pages: {
      home: true,
      classes: false
    }
  }

  componentDidMount () {

    fetch('/api/authenticated').then(handleErrors).then(data => {
      if (data.authenticated) {
        this.setState({ user_full_name: data.full_name })
      }
    }).then(() => {
      this.getSchool()
    })


  }

  getSchool = () => {
    fetch('/api/schools').then(handleErrors).then(data => {
      this.setState({ loading: false, school_name: data.school.school_name })
    })
  }

  makeActive = (page) => {
    const pages = Object.keys(this.state.pages)
    let active = '';
    for (var i = 0; i < pages.length; i++) {
      if (this.state.pages[pages[i]] === true) {
        active = pages[i];
        break;
      }
    }
                
 
  }
  
  render () {
    if (this.state.loading) {
      return (
        <div className="container">
          <LoadingWidget />
        </div>
      )
    } 

    return (
      <React.Fragment>
      <div className="container-fluid" id="layout">
        <div className="row" style={{height: '100vh'}}>
          <div className="col-12 col-md-3 pl-0" style={{backgroundColor: '#212529'}}>
          <nav className="navbar navbar-expand-lg flex-column align-items-start">
          <a className="navbar-brand" href="#">{this.state.school_name}</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto flex-column">
              <li>
                <Link onClick={() => this.makeActive('home')} className={`nav-link ${this.state.pages.home? 'active': ''}`} to="/app"><i className="fas fa-home d-inline-block mr-3"></i> Home</Link>
              </li>
              <li>
                <Link onClick={() => this.makeActive('classes')} className={`nav-link ${this.state.pages.classes}`} to="/app/classes"><i className="fas fa-user-friends d-inline-block mr-3"></i> Classes</Link>
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
            <div className="d-flex justify-content-between py-4" id="notifications-menu" style={{borderBottom: '1px solid #212529'}}>
              <h4 className="font-weight-bold ml-3">Hello, {this.state.user_full_name}</h4>
              <div>
                <span className="d-inline-block mr-3"><i className="fas fa-comment-alt d-inline-block mr-2"></i>Feedback? </span>
                <span><i className="fas fa-bell display-inline-block mr-3"></i></span>
                <span><i className="fas fa-question-circle display-inline-block mr-3"></i></span>
                <span><i className="fas fa-user display-inline-block mr-3"></i></span>
              </div>
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    </React.Fragment>
    )
  }
}

export default Layout;