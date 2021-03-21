import React from 'react';
import { Link } from 'react-router-dom';
import LoadingWidget from '@util/loading';
import { handleErrors, safeCredentials } from '@util/fetchHelper';

import './layout.scss';

class Layout extends React.Component {

  state = {
    loading: true,
    server_loading: false,
    school_name: '',
    user_full_name: '',
    pages: {
      home: true,
      classes: false,
      exams: false,
      fee: false,
      attendance: false,
      parents: false,
      student: false
    },
    user: false
  }

  componentDidMount () {

    fetch('/api/authenticated').then(handleErrors).then(data => {
       
      if (!data.authenticated) {
        window.location = `/login?redirect_url=${window.location.pathname}`
      } else {
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

    this.setState({pages: {[active]: false, [page]: true}})
  }

  toggleNotifications = () => {
    this.setState({ user: !this.state.user })
  }

  logout = () => {
    const { server_loading } = this.state;

    if (!server_loading) {
      // stop sending more requests
      this.setState({ server_loading: true })

      fetch('/api/sessions', safeCredentials({
        method: 'DELETE'
      })).then(handleErrors).then(data => {
        this.setState({ server_loading: false })

        if (data.success) {
          window.location = '/'
        }
      })
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
                <Link onClick={() => this.makeActive('classes')} className={`nav-link ${this.state.pages.classes? 'active': ''}`} to="/app/classes"><i className="fas fa-user-friends d-inline-block mr-3"></i> Classes</Link>
              </li>
              <li>
                <Link onClick={() => this.makeActive('exams')} className={`nav-link ${this.state.pages.exams && 'active'}`} to="/app/exams"><i className="fas fa-envelope-open-text d-inline-block mr-3"></i> Exams</Link>
              </li>
              <li>
                <Link onClick={() => this.makeActive('fee')} className={`nav-link ${this.state.pages.fee && 'active'}`} to="/app/payments"><i className="fas fa-money-bill d-inline-block mr-3"></i> Fee</Link>
              </li>
              <li>
                <Link onClick={() => this.makeActive('attendance')} className={`nav-link ${this.state.pages.attendance && 'active'}`} to="/app/attendances"><i className="fas fa-calendar-check d-inline-block mr-3"></i> Attendance</Link>
              </li>
              <li>
                <Link onClick={() => this.makeActive('student')} className={`nav-link ${this.state.pages.student && 'active'}`} to="/app/student"><i className="fas fa-user-edit d-inline-block mr-3"></i> Student</Link>
              </li>
              <li>
                <a onClick={() => this.makeActive('parents')} className={`nav-link ${this.state.pages.parents && 'active'}`} href="#"><i className="fas fa-users d-inline-block mr-3"></i> Parents</a>
              </li>
            </ul>
          </div>
       </nav>
          </div>
          <div className="col-12 col-md-9 p-0">
            <div className="d-flex justify-content-between py-4" style={{borderBottom: '1px solid #212529'}}>
              <h4 className="font-weight-bold ml-3">Scm, {this.state.user_full_name}</h4>
              <div id="notifications-menu">
                <span className="d-inline-block mr-3"><i className="fas fa-comment-alt d-inline-block mr-2"></i>Feedback? </span>
                <span><i className="fas fa-bell display-inline-block mr-3"></i></span>
                <span><i className="fas fa-question-circle display-inline-block mr-3"></i></span>
                <span tabIndex="0" onFocus={this.toggleNotifications} onBlur={this.toggleNotifications}>
                  <i className="fas fa-user display-inline-block mr-3"></i>
                  {this.state.user && (
                  <div className="menu">
                    <span onClick={this.logout}>Log out</span>
                  </div>
                )}
                  </span>
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