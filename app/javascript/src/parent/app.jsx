import React from 'react';
import Loading from '@util/loading';
import { safeCredentials, handleErrors } from '@util/fetchHelper';

class App extends React.Component {

  state = {
    username: '',
    password: '',
    parent_id: '',
    school_name: '',
    login: true,
    year: '5',
    attendance_year: '5',
    month: '1',
    day: '1',
    type: '1',
    error: '',
    first_loading: true,
    students_exams: [],
    students_attendances: [],
    loading_server: false
  }

  componentDidMount () {
    // update the date to current date
    const date = new Date()
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate())
    this.setState({ month, day })
  }

  changeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  fetchExamChangeHanlder = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })

    switch (name) {
      case 'type':
        var { year } = this.state;
        var type = value;
        break;
      case 'year':
        var { type } = this.state;
        var year = value;
        break
    }

    this.getExam(this.state.parent_id, year, type)
    
  }

  fetchAttendanceChangeHanlder = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })

    switch (name) {
      case 'year':
        var { month, day } = this.state;
        var year = value;
        break;
      case 'month':
        var { year, day } = this.state;
        var month = value;
        break
      case 'day':
        var { year, month } = this.state;
        var day = value;
      break  
    }

    this.getAttendance(this.state.parent_id, year, month, day)
  }

  submitHandler = (event) => {
    event.preventDefault()
    const { username, password } = this.state;
    fetch(`/api/parentusers?username=${username}&password=${password}`).then(handleErrors).then(data => {
      if (data.success) {
        this.setState({ parent_id: data.parent_id, username: data.username, school_name: data.school_name, login: false })
        
        // fetch exams
        const { year, type, month, day } = this.state;
        this.getExam(data.parent_id, year, type)
        this.getAttendance(data.parent_id, year, month, day)

      }
    })
  }

  getExam = (parent_id, year_id, type_id) => {
    if (!this.state.loading_server) {
      if (!this.state.first_loading) {
        this.setState({ loading_server: true })
      }

      if (parent_id && year_id && type_id) {
        fetch(`/api/exams/${parent_id}?year_id=${year_id}&type_id=${type_id}`).then(handleErrors).then(data => {
          if (data.students) {this.setState({ students_exams: data.students, loading_server: false })
        }
        })
      }
    }
  }

  getAttendance = (parent_id, year_id, month_id, day_id) => {
    if (!this.state.loading_server) {
      this.setState({ loading_server: true })

      if (parent_id && year_id && month_id && day_id) {
        fetch(`/api/attendances/${parent_id}?year_id=${year_id}&month_id=${month_id}&day_id=${day_id}`).then(handleErrors).then(data => {
          if (data.students) {
            this.setState({ students_attendances: data.students, loading_server: false, first_loading: false })
        }
        })
      }
    }
  }
  

  render () {
    const { username, password, login, year, attendance_year, school_name, type, error, students_exams, students_attendances, month, day } = this.state;
    const days = [];
    for (var i = 1; i < 32; i++) {
      days.push(i)
    }

    if (login) {
      return (
        <div className="container">
          <div className="row justify-content-center">
          <div className="col-12 text-center">
          <h2>Parent Login</h2>
          <p>{error && <span>{error}</span> }</p>
          </div>
          <div className="col-12 col-md-6 text-center">
          <form onSubmit={this.submitHandler}>
            <input
              className="form-control mb-3"
              name="username"
              type="text"
              value={username}
              placeholder="Username"
              onChange={this.changeHandler}
              required
              />
            <input
              className="form-control mb-3"
              name="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={this.changeHandler}
              required
              /> 
              <button type="submit" className="btn btn-dark">Log in</button>
          </form>
          </div>
        </div>
       </div>
      )
    }
    return (
      <div className="container-fluid">
        <div className="row bg-dark text-light">
          <div className="col-12 col-md-6">
            <h3>{school_name && school_name}</h3>
          </div>
          <div className="col-12 col-md-6 text-right">
            <h5>@{username && username}</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-right">
            <h2 className="text-center">Exams</h2>
              <select className="form-control" value={year} name="year" onChange={this.fetchExamChangeHanlder} style={{width: 'initial', display: 'inline-block'}}>
                <option value="1">2017</option>
                <option value="2">2018</option>
                <option value="3">2019</option>
                <option value="4">2020</option>
                <option value="5">2021</option>
              </select>
              <select className="form-control" value={type} name="type" onChange={this.fetchExamChangeHanlder} style={{width: 'initial', display: 'inline-block'}}>
                <option value="1">Final</option>
                <option value="2">Sub Final</option>
                <option value="3">Midterm</option>
                <option value="4">Sub Midterm</option>
              </select>
            </div>
        </div>
        <div className="row m-0">
          <div className="col-12 p-0">
            <table className="table table-bordered table-responsive-lg" style={{fontSize: "13px"}}>
            <thead>
                  <tr>
                    <th>id</th>
                    <th>Full Name</th>
                    <th>Math</th>
                    <th>Biology</th>
                    <th>Physics</th>
                    <th>Chemistry</th>
                    <th>Geography</th>
                    <th>History</th>
                    <th>Arabic</th>
                    <th>English</th>
                    <th>Somali</th>
                    <th>Islamic Study</th>
                  </tr>
                </thead>
              <tbody>
                {students_exams.map(student_exam => (
                    <tr key={student_exam.id}>
                      <th>#{student_exam.student_id}</th>
                      <td>{student_exam.full_name}</td>
                      <td>{student_exam.math}</td>
                      <td>{student_exam.biology}</td>
                      <td>{student_exam.physics}</td>
                      <td>{student_exam.chemistry}</td>
                      <td>{student_exam.geography}</td>
                      <td>{student_exam.history}</td>
                      <td>{student_exam.arabic}</td>
                      <td>{student_exam.english}</td>
                      <td>{student_exam.somali}</td>
                      <td>{student_exam.islamic_study}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
          <div className="row m-0">
            <div className="col-12 text-right p-0">
            <h2 className="text-center">Attendances</h2>
                <select className="form-control" value={attendance_year} name="attendance_year" onChange={this.fetchAttendanceChangeHanlder} style={{width: 'initial', display: 'inline-block'}}>
                  <option value="1">2017</option>
                  <option value="2">2018</option>
                  <option value="3">2019</option>
                  <option value="4">2020</option>
                  <option value="5">2021</option>
                </select>
                <select className="form-control" value={month} name="month" onChange={this.fetchAttendanceChangeHanlder} style={{width: 'initial', display: 'inline-block'}}>
                  <option value="1">Jan</option>
                  <option value="2">Feb</option>
                  <option value="3">Mar</option>
                  <option value="4">Apr</option>
                  <option value="5">May</option>
                  <option value="6">Jun</option>
                  <option value="7">Jul</option>
                  <option value="8">Aug</option>
                  <option value="9">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </select>
                <select className="form-control" value={day} name="day" onChange={this.fetchAttendanceChangeHanlder} style={{width: 'initial', display: 'inline-block'}}>
                {days && (days.map(day => (
                  <option key={day} value={day}>{day}</option>
                )))}
                </select>
              </div>
        </div>
        <div className="row m-0">
          <div className="col-12 p-0">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Full Name</th>
                  <th>present</th>
                </tr>
              </thead>
              <tbody>
                {students_attendances && students_attendances.map(attendance => (
                  <tr key={attendance.id}>
                    <th>#{attendance.student_id}</th>
                    <td>{attendance.full_name}</td>
                    <td>{attendance.absent? (<i className="fas fa-times" style={{color: 'red'}}></i>): (<i className="fas fa-check d-inline-block" style={{color: 'green'}}></i>)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <footer className="row p-3 bg-dark text-light">
          <div>
            <p className="mr-3 mb-0">Dugsi Cloud <small>© Copyright 2021. All Rights Reserved.</small> - <small>Developed by <a href="https://www.facebook.com/ismaileidjama" target="_blank">Ismail Eid</a></small> </p>
          </div>
       </footer>
      </div>
    )
  }
}

export default App;