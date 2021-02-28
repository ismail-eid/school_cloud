import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AboutWidget from './aboutWidget';
import Layout from './homeLayout';
import HomeWidget from './homeWidget';
import LoginWidget from './loginWidget';
import SignupWidget from './signupWidget';

const Home = (props) => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/"  exact component={HomeWidget} />
          <Route path="/about" exact component={AboutWidget} />
          <Route path='/login' exact component={LoginWidget} />
          <Route path='/signup' exact component={SignupWidget} />
        </Switch>
      </Layout>
    </Router>
  )
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div'))
  )
})