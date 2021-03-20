import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layout';
import HomeWidget from './home';
import ClassesWidget from './classes';
import SpecialClass from './specialClass';
import SpecialStudent from './specialStudent';
import ExamWidget from './exams';
import AttendanceWidget from './attendance';
import FeeWidget from './fee';


const App = (props) => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/app" exact component={HomeWidget} />
          <Route path="/app/classes" exact component={ClassesWidget} />
          <Route path="/app/classes/:id" exact component={SpecialClass} />
          <Route path="/app/classes/:class_id/students/:id" exact component={SpecialStudent} />
          <Route path="/app/exams" exact component={ExamWidget} />
          <Route path="/app/attendances" exact component={AttendanceWidget} />
          <Route path="/app/payments" exact component={FeeWidget} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App;