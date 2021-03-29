import React from 'react';
import { safeCredentials, handleErrors } from '@util/fetchHelper';
import Loading from '@util/loading';

class ParentsWidget extends React.Component {

  state = {
    loading: true,
    search: '',
    type: 'name',
    parent: null,
    add_parent: false,
    full_name: '',
    phone: '',
    username: '',
    password: '',
    created: false
  }

  changeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  toggleAddParent = () => {
    this.setState({ add_parent: !this.state.add_parent })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const { full_name, phone, username, password } = this.state;
    if (full_name && phone && username && password) {
      fetch('/api/parents', safeCredentials({
        method: 'POST',
        body: JSON.stringify({
          parent: {
            full_name, 
            phone
          }
        })
      })).then(handleErrors).then(data => {
        if (data.id) {
          fetch('/api/parentusers', safeCredentials({
            method: 'POST',
            body: JSON.stringify({
              user: {
                username,
                password,
                parent_id: data.id
              }
            })
          })).then(handleErrors).then(data => {
            if (data.username) {
              this.setState({ created: true })
            }
          }) 
        }
      })
    }
  }

  searchParent = () => {
    const { type, search } = this.state;
    if (search) {
      fetch(`/api/parents?${type === 'phone'? `phone=${search}`: `full_name=${search}`}`).then(handleErrors).then(data => {
        if (data) {this.setState({ parent: data })}
      })
    }
  }

  render () {
    const { loading, search, type, parent, add_parent, full_name, phone, username, password } = this.state;

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
                  <th>Phone</th>
                  <th>Username</th>
                </tr>
              </thead>
           {parent && (
              <tbody>
                <tr>
                  <td>{parent.id}</td>
                  <td>{parent.full_name}</td>
                  <td>{parent.phone}</td>
                  <td>{parent.username}</td>
                </tr>
              </tbody>)}
           </table>
          </div>
        </div>
        <div className="row m-0">
          <div className="col-12 text-right">
          <button className="btn btn-dark mr-1" onClick={this.toggleAddParent}>Create</button>
           <button className="btn btn-dark">Update</button>
          </div>
        </div>
        {add_parent && (
           <div className="box-popup" id="myForm">
           <form onSubmit={this.submitHandler} className="form-group form-popup" style={{maxWidth: '500px', maxHeight: '400px'}}>
               <h3 className="font-weight-bold text-center my-3">Create New Parent</h3>
               <input
                   className="form-control mb-3"
                   type="text"
                   name="full_name"
                   placeholder="Full Name"
                   value={full_name}
                   onChange={this.changeHandler}
                   required
                 />
                 <input
                   className="form-control mb-3"
                   type="text"
                   name="phone"
                   placeholder="Phone"
                   value={phone}
                   onChange={this.changeHandler}
                   required
                 />
                 <input
                   className="form-control mb-3"
                   type="text"
                   name="username"
                   placeholder="Username"
                   value={username}
                   onChange={this.changeHandler}
                   required
                 />
                 <input
                   className="form-control mb-3"
                   type="password"
                   name="password"
                   placeholder="Password"
                   value={password}
                   onChange={this.changeHandler}
                   required
                 />
                 {this.state.created && (
                  <span className="text-success m-auto">success</span>
                )}
               <button className="btn btn-danger form-control mb-1" onClick={this.toggleAddParent}>Cancel</button>
               <button className="btn btn-success form-control" onClick={this.submitHandler}>Create</button>
           </form>
         </div> 
        )}
      </div>
    )
  }
}

export default ParentsWidget;