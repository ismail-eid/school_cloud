import React from 'react';
import { handleErrors, safeCredentials } from '@util/fetchHelper';
import Loading from '@util/loading';

class AttendanceWidget extends React.Component {

  state = {
    loading: true,
    classes: [],
    students_attendances: [],
    add_attendance: false,
    glass: '',
    year: '5',
    month: '1',
    day: '1',
    student: '',
    created: false
  }

  componentDidMount () {
     // get classes
     fetch('/api/glasses').then(handleErrors).then(data => {
      this.setState({ classes: data.glasses, loading: false})

      if (data.glasses[0]) {
        this.setState({glass: data.glasses[0].id})
      }
    }).then(() => {
      const {glass, year, month, day} =  this.state;
      this.getAttendance(glass, year, month, day)
    })
  }

  toggleAddAttendance = () => {
    this.setState({ add_attendance: !this.state.add_attendance})
  }

  changeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })

    switch (name) {
      case 'glass':
        var { month, day, year } = this.state;
        var glass = value;
        break;
      case 'year':
        var { month, day, glass } = this.state;
        var year = value;
        break;
      case 'month':
        var { year, day, glass } = this.state;
        var month = value;
        break;
      case 'day':
        var { year, month, glass } = this.state;
        var day = value
        break  ;
    }

    this.getAttendance(glass, year, month, day);
  }

  addChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  getAttendance = (glass_id, year_id, month_id, day_id) => {
    if (glass_id && year_id && month_id && day_id) {
      fetch(`/api/attendances?glass_id=${glass_id}&year_id=${year_id}&month_id=${month_id}&day_id=${day_id}`).then(handleErrors).then(data => {
        if (data.students) {this.setState({ students_attendances: data.students,})
        if (data.students[0]) {
          this.setState({ student: data.students[0].id  })
        }
      }
      })
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    const { student, year, month, day } = this.state;
    fetch('/api/attendances', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        student: {
          student_id: student,
          year_id: year,
          month_id: month,
          day_id: day
        }
      })
    })).then(handleErrors).then(data => {
      console.log(data);
    })
  }

  render () {
    const { loading, classes, students_attendances, add_attendance, glass, year, month, day , student, created } = this.state;
    const days = [];
    for (var i = 1; i < 32; i++) {
      days.push(i)
    }

    if (loading) {
      return <Loading />
    }

    return (
      <div id="attendances">
        <div className="row m-0 my-2">
          <div className="col-12 p-0">
            <div className="additions d-flex justify-content-end">
              <button className="btn btn-primary ml-2" style={{backgroundColor: '#212529'}} onClick={this.toggleAddAttendance}>
                + Add Attendance
              </button>
            </div>
          </div>
        </div>  
        <div className="row m-0">
        <div className="col-12 text-right p-0">
            <select className="form-control" name="glass" value={glass} onChange={this.changeHandler} style={{width: 'initial', display: 'inline-block'}}>
              {classes.map(glass => {
                return (
                  <option key={glass.id} value={`${glass.id}`}>{glass.class_name}</option>
                )
              })}
            </select>
            <select className="form-control" value={year} name="year" onChange={this.changeHandler} style={{width: 'initial', display: 'inline-block'}}>
              <option value="1">2017</option>
              <option value="2">2018</option>
              <option value="3">2019</option>
              <option value="4">2020</option>
              <option value="5">2021</option>
            </select>
            <select className="form-control" value={month} name="month" onChange={this.changeHandler} style={{width: 'initial', display: 'inline-block'}}>
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
            <select className="form-control" value={day} name="day" onChange={this.changeHandler} style={{width: 'initial', display: 'inline-block'}}>
             {days && (days.map(day => (
               <option key={day} value={day}>{day}</option>
             )))}
            </select>
          </div>
        </div>
        <div className="row m-0">
          <div className="col-12 p-0 wrap" style={{height: 'calc(100vh - 200px)'}}>
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
                    <th>{attendance.student_id}</th>
                    <td>{attendance.full_name}</td>
                    <td>{attendance.absent? (<i className="fas fa-times" style={{color: 'red'}}></i>): (<i className="fas fa-check d-inline-block" style={{color: 'green'}}></i>)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {add_attendance && (
          <div className="box-popup">
            <form className="form-group form-popup" style={{maxWidth: '500px', maxHeight: '450px'}}>
              <h3 className="font-weight-bold text-center my-3">Enter new Attendance</h3>
              <select className="form-control mb-3" value={student} name="student" value={student} onChange={this.addChangeHandler}>
                {students_attendances.map(attendance => (
                  <option key={attendance.id} value={`${attendance.id}`}>{attendance.full_name}</option>
                ))}
              </select>
              <select className="form-control mb-3" value={year} name="year" onChange={this.addChangeHandler}>
                <option value="5">2021</option>
                <option value="4">2020</option>
                <option value="3">2019</option>
                <option value="2">2018</option>
                <option value="1">2017</option>
              </select>
              <select className="form-control mb-3" value={month} name="month" onChange={this.addChangeHandler}>
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
              <select className="form-control mb-3" value={day} name="day" onChange={this.addChangeHandler}>
                {days && (days.map(day => (
                <option key={day} value={day}>{day}</option>
              )))}
              </select>
              <button className="btn btn-danger form-control mb-1" onClick={this.toggleAddAttendance}>Cancel</button>
              <button type="submit" className="btn btn-success form-control" onClick={this.submitHandler}>Create</button>
            </form>
          </div>  
        )}
      </div>  
    )
  }
}

export default AttendanceWidget;