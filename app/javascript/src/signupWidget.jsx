import React from 'react';
import {safeCredentials, handleErrors} from '@util/fetchHelper.js'

class SignupWidget extends React.Component {
    
  state = {
    full_name: '',
    email: '',
    password: '',
    school_name: '',
    tell: '',
    address: '',
    loading: false,
    error: ''
  }

  photoFile = React.createRef()

  changeHandler = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value})
  }

  submitHandler = (event) => {
    event.preventDefault()
    const { full_name, email, password } = this.state;
    
    // make user
    fetch('api/users', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          full_name,
          email,
          password
        }
      })
    })).then(handleErrors).then(data => {
      console.log('api users', data)
      this.makeSchool(data.user.email)
    })
  }

  makeSchool = (user_email) => {
    // make school 

    const { school_name, tell, address } = this.state;

    fetch('api/schools', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        school: {
          name: school_name,
          tell,
          address,
          user_email
        }
      })
    })).then(handleErrors).then(data => {
      console.log('api schools', data)
      this.makeSession(this.state.email, this.state.password)
    })
  }

  makeSession = (user_email, user_password) => {
    // make session
    fetch('api/sessions', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: user_email,
          password: user_password
        }
      })
    })).then(handleErrors).then(data => {
      console.log('api sessions', data)
      if  (data.success === true) {
        window.location = '/app'
      }
    })
  }

  render () {
    const {full_name, email, password, school_name, tell, address} = this.state;
    return (
      <form className="row m-0 m-md-5" onSubmit={this.submitHandler}>
         <label className="col-12 col-md-6">
         <input
            className="form-control"
            type="text"
            name="full_name" 
            value={full_name}
            placeholder="Full Name"
            onChange={this.changeHandler}
           />
         </label>
          <label className="col-12 col-md-6">
          <input
            className="form-control"
            type="email"
            name="email" 
            value={email}
            placeholder="Email"
            onChange={this.changeHandler}
           />
          </label>
          <label className="col-12 col-md-6">
          <input
            className="form-control"
            type="password"
            name="password" 
            value={password}
            placeholder="Password"
            onChange={this.changeHandler}
           />
          </label>
          <label className="col-12 col-md-6">
          <input
            className="form-control"
            type="text"
            name="school_name" 
            value={school_name}
            placeholder="School Name"
            onChange={this.changeHandler}
           />
          </label>
          <label className="col-12 col-md-6">
          <input
            className="form-control"
            type="text"
            name="tell" 
            value={tell}
            placeholder="School Tell"
            onChange={this.changeHandler}
           />
          </label>
          <label className="col-12 col-md-6">
          <input
            className="form-control"
            type="text"
            name="address" 
            value={address}
            placeholder="School address"
            onChange={this.changeHandler}
           />
          </label>
           <label className="col-12">
           <input className="form-control-file" type="file" name="school_photo" ref={this.photoFile} />
           </label>
           <button type="submit" className="btn btn-primary m-auto bg-dark">Signup</button>
      </form>
    )
  }
}

export default SignupWidget;