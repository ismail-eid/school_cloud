import React from 'react';
import Loading from '@util/loading';

class App extends React.Component {

  state = {
    username: '',
    password: '',
    login: true,
    error: ''
  }

  changeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ name: value })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const { username, password } = this.state;
    console.log(username, password)
  }
  

  render () {
    if (login) {
      return (
        <div className="container">
          <div className="row justify-content-center">
          <div className="col-12 text-center">
          <h2>Login In</h2>
          <p>{error && <span>{error}</span> }</p>
          </div>
          <div className="col-12 col-md-6">
          <form onSubmit={this.submitHandler}>
            <input
              className="form-control mb-3"
              name="email"
              type="email"
              value={email}
              placeholder="Email"
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
      <div className="container">
        <div className="row">
          <div className="col-12">

          </div>
        </div>
        {this.props.children}
        <div className="row">
          <div className="col-12">
            
          </div>
        </div>
      </div>
    )
  }
}

export default App;