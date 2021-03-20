import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '@util/loading';
import { safeCredentials, handleErrors } from '@util/fetchHelper.js';

class ClassesWidget extends React.Component {
  state = {
    loading:  true,
    add_class: false,
    class_name: '',
    classes: []
  }

  componentDidMount () {
    fetch('/api/glasses').then(handleErrors).then(data => {
      if (data) {
        this.setState({classes: data.glasses, loading: false})
      }
    })
  }

  changeHandler = (event) => {
    this.setState({class_name: event.target.value})
  }

  submitHandler = (event) => {
    event.preventDefault();
    fetch('/api/glasses', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        new_class: {
          class_name: this.state.class_name
        }
      })
    })).then(handleErrors).then(data => {
      if (data.success) {
        this.setState({classes: this.state.classes.concat(data.class)})
        this.toggleAddClass()
      }
    })
  }

  toggleAddClass = () => {
    this.setState({add_class: !this.state.add_class, class_name: ""})
  }

  render () {
    const { classes, loading, class_name } = this.state;

    if (loading) {
      return <Loading />
    }

    return (
    <React.Fragment> 
      <div className="row m-0 my-2" id="classes">
        <div className="col-12">
          <div className="additions d-flex justify-content-end">
            <button className="btn btn-primary ml-2" style={{backgroundColor: '#212529'}} onClick={this.toggleAddClass}>
              + Add class
            </button>
          </div>
        </div>
      </div>  
      <div className="row m-0 wrap" style={{height: 'calc(100vh - 140px)', borderTop: '1px solid rgba(0, 0, 0, .2)'}}>
        {classes && classes.map(school_class => (
          <div className="col-12 col-md-4 col-lg-3 mt-2" key={school_class.id}>
            <Link to={`/app/classes/${school_class.id}`} className="text-decoration-none" title={school_class.class_name}>
              <div className="p-3 mb-2" style={{border: '1px solid #212529', color: '#212529'}}>
              <h3>{school_class.class_name}</h3>
              <p><span>{school_class.number_of_students} students</span></p>
              <button className="btn btn-warning ml-2">update</button>
              <button className="btn btn-danger ml-2">delete</button>
              </div>
            </Link>
          </div>  
        )) }
      </div>  
        
        {this.state.add_class && (
          <div className="box-popup" id="myForm">
            <form onSubmit={this.submitHandler} className="form-group form-popup" style={{maxWidth: '500px', maxHeight: '280px'}}>
                <h3 className="font-weight-bold text-center my-3">Create New Class</h3>
                  <input
                    className="form-control mb-3"
                    type="text"
                    name="class_name"
                    placeholder="Class Name"
                    value={class_name}
                    onChange={this.changeHandler}
                  />
                <button className="btn btn-danger form-control mb-1" onClick={this.toggleAddClass}>Cancel</button>
                <button className="btn btn-success form-control">Create</button>
            </form>
          </div> 
        )}
    </React.Fragment> 
    )
  }
}

export default ClassesWidget;