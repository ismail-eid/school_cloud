import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layout'
import HomeWidget from './home'
import ClassesWidget from './classes'

const App = (props) => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/app" exact component={HomeWidget} />
          <Route path="/app/classes" component={ClassesWidget} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App;