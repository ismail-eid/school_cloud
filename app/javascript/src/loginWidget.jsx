import React from 'react';
import { handleErrors, safeCredentials } from '@util/fetchHelper';
import Loading from '@util/loading';

class LoginWidget extends React.Component {
  state = {
    loading: true,
    authenticated: false,
    email: '',
    password: '',
    error: ''
  }

  componentDidMount () {
    fetch('/api/authenticated').then(handleErrors).then(data => {
      if (data.authenticated) {
        this.setState({ loading: false, authenticated: true })
      } else {
        this.setState({ loading: false })
      }
    })
  }

  changeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const { email, password } = this.state;

    fetch('/api/sessions', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          email,
          password
        }
      })
    })).then(handleErrors).then(data => {
      if (data.success) {
        const params = new URLSearchParams(window.location.search)
        const redirect_url = params.get('redirect_url') || '/app';
        window.location = redirect_url;
      }
    }).catch(error => {
      this.setState({error: "Sorry, email or password are incorrect"})
    })
  }

  render () {
    const { email, password, error, loading, authenticated } = this.state;
    if (loading) { return <Loading /> }

    if (authenticated) {
      return (
        <div className="row">
          <div className="col-12 text-center">
            <p>You are already logined in. do you  wan to go to the app <a href="/app">go app</a> </p>
          </div>
        </div>
      )
    }

    return (
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
    )
  }
}

export default LoginWidget;