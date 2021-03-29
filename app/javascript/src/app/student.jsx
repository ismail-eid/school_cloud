import React from 'react';
import { Link } from 'react-router-dom';
import { safeCredentials, handleErrors } from '@util/fetchHelper';
import Loading from '@util/loading';

class StudentWidget extends React.Component {

  state = {
    loading: true,
    search: '',
    type: 'name',
    student: null
  }

  changeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  searchParent = () => {
    const { type, search } = this.state;
    if (search) {
      fetch(`/api/student?${type === 'phone'? `phone=${search}`: `full_name=${search}`}`).then(handleErrors).then(data => {
        this.setState({ student: data.student })
      })
    }
  }

  render () {
    const { loading, search, type, student } = this.state;

    return (
      <div>
        <div className="row m-0 p-0 p-md-2">
          <div className="col-12 col-md-10 p-0 pr-md-1">
            <input
              className="form-control"
              type="text"
              name="search"
              value={search}
              onChange={this.changeHandler}
              placeholder="Phone or Name of the parent"
            />
          </div>
          <div className="col-12 col-md-1 p-0 pr-md-1">
          <select className="form-control" name="type" value={type} onChange={this.changeHandler}>
              <option value="name">Name</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          <div className="col-12 col-md-1 p-0">
            <button onClick={this.searchParent} className="btn btn-dark">Search</button>
          </div>
        </div>
        <div className="row m-0 p-0 p-md-2">
          <div className="col-12 p-0">
          <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Full Name</th>
                  <td>Student Class</td>
                  <th>Phone</th>
                  <th>Parent Phone</th>
                </tr>
              </thead>
           {student && (
              <tbody>
                <tr>
                  <td>{student.student_id}</td>
                  <td><Link to={`/app/classes/${student.class_id}/students/${student.id}`} style={{color: 'black', fontWeight: 'normal'}}>{student.full_name}</Link></td>
                  <td>{student.class}</td>
                  <td>{student.phone}</td>
                  <td>{student.parent_phone}</td>
                </tr>
              </tbody>)}
           </table>
          </div>
        </div>
      </div>
    )
  }
}

export default StudentWidget;