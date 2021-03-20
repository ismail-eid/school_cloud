import React from 'react';
import { safeCredentials, handleErrors } from '@util/fetchHelper';
import Loading from '@util/loading';

class ExamWidget extends React.Component {
  state = {
    loading: true,
    classes: [],
    students_exams: [],
    add_exam: false,
    glass: '',
    year: '1',
    type: '1',
    subject: '1',
    student: '',
    grade: '',
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
      const { glass, year, type } = this.state;
      this.getExam(glass, year, type)
    })

  }

  changeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })

    switch (name) {
      case 'glass':
        var { year, type } = this.state
        var glass = value
        break
      case 'year':
        var { glass, type } = this.state
        var year = value
        break
      case 'type':
        var { year, glass } = this.state
        var type = value
        break  
    }

    this.getExam(glass, year, type)
    
  }

  addChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  toggleAddExam = () => {
    this.setState({ add_exam: !this.state.add_exam})
  }

  getExam = (glass_id, year_id, type_id) => {
    if (glass_id && year_id && type_id) {
      fetch(`/api/exams?glass_id=${glass_id}&year_id=${year_id}&type_id=${type_id}`).then(handleErrors).then(data => {
        if (data.students) {this.setState({ students_exams: data.students, student: data.students[0].id  })
      }
      })
    }
  }

   createdRemover = () => {
     window.setTimeout(() => {
       this.setState({ created: false })
     }, 2000)
   } 

   componentWillMount () {

   }

  submitHandler = (event) => {
    event.preventDefault()
    const { student, year, type, grade, subject } = this.state;
    fetch('/api/exams', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        student: {
          student_grade: grade,
          student_id: student,
          year_id: year,
          type_id: type,
          subject_id: subject
        }
      })
    })).then(handleErrors).then(data => {
       if (data.success) {
        var getIndex;
        const { students_exams } = this.state;
  
        students_exams.forEach((student, index) => {
         if (student.id === Number(this.state.student)) { getIndex = index }
        })
        const updated_students = this.state.students_exams.slice();
        updated_students[getIndex][data.subject] = data.grade;
        this.setState({ students_exams: updated_students })
        
        this.setState({ created: true })
        this.createdRemover()
       }
    })
  }

  render () {
    const { loading, classes, students_exams, add_exam, glass, year, type, student, subject, grade } =  this.state;

    if (loading) { return <Loading /> }

    return (
      <div id="exams"> 
        <div className="row m-0 my-2">
          <div className="col-12 p-0">
            <div className="additions d-flex justify-content-end">
              <button className="btn btn-primary ml-2" style={{backgroundColor: '#212529'}} onClick={this.toggleAddExam}>
                + Add exam
              </button>
            </div>
          </div>
        </div>  
        <div className="row">
          <div className="col-12 text-right">
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
            <select className="form-control" value={type} name="type" onChange={this.changeHandler} style={{width: 'initial', display: 'inline-block'}}>
              <option value="1">Final</option>
              <option value="2">Sub Final</option>
              <option value="3">Midterm</option>
              <option value="4">Sub Midterm</option>
            </select>
          </div>
        </div>
        <div className="row m-0">
          <div className="col-12 p-0">
            <table className="table table-bordered" style={{fontSize: "13px"}}>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Full Name</th>
                  <th>Math</th>
                  <th>Biology</th>
                  <th>Physics</th>
                  <th>Chemistry</th>
                  <th>Geography</th>
                  <th>History</th>
                  <th>Arabic</th>
                  <th>English</th>
                  <th>Somali</th>
                  <th>Islamic Study</th>
                </tr>
              </thead>
              <tbody>
                {students_exams.map(student_exam => (
                    <tr key={student_exam.id}>
                      <th>#{student_exam.student_id}</th>
                      <td>{student_exam.full_name}</td>
                      <td>{student_exam.math}</td>
                      <td>{student_exam.biology}</td>
                      <td>{student_exam.physics}</td>
                      <td>{student_exam.chemistry}</td>
                      <td>{student_exam.geography}</td>
                      <td>{student_exam.history}</td>
                      <td>{student_exam.arabic}</td>
                      <td>{student_exam.english}</td>
                      <td>{student_exam.somali}</td>
                      <td>{student_exam.islamic_study}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {add_exam && (
          <div className="box-popup">
            <form className="form-group form-popup" style={{maxWidth: '500px', maxHeight: '450px'}}>
              <h3 className="font-weight-bold text-center my-3">Enter new Grade</h3>
              <select className="form-control mb-3" value={student} name="student" value={student} onChange={this.addChangeHandler}>
                {students_exams.map(student_exam => (
                  <option key={student_exam.id} value={`${student_exam.id}`}>{student_exam.full_name}</option>
                ))}
              </select>
              <select className="form-control mb-3" value={year} name="year" onChange={this.addChangeHandler}>
                <option value="1">2017</option>
                <option value="2">2018</option>
                <option value="3">2019</option>
                <option value="4">2020</option>
                <option value="5">2021</option>
              </select>
              <select className="form-control mb-3" value={type} name="type" onChange={this.addChangeHandler}>
                <option value="1">Final</option>
                <option value="2">Sub Final</option>
                <option value="3">Midterm</option>
                <option value="4">Sub Midterm</option>
              </select>
              <select className="form-control mb-3" value={subject} name="subject" onChange={this.addChangeHandler}>
                <option value="1">Math</option>
                <option value="2">Biology</option>
                <option value="3">Chemistry</option>
                <option value="4">Physics</option>
                <option value="5">Geography</option>
                <option value="6">History</option>
                <option value="7">Arabic</option>
                <option value="8">English</option>
                <option value="9">Somali</option>
                <option value="10">Islamic Study</option>
              </select>
              <input
                className="form-control mb-3" 
                type="text"
                name="grade"
                value={grade}
                placeholder="mark"
                onChange={this.addChangeHandler}
                required
                />
                {this.state.created && (
                  <span className="text-success m-auto">success</span>
                )}
              <button className="btn btn-danger form-control mb-1" onClick={this.toggleAddExam}>Cancel</button>
              <button type="submit" className="btn btn-success form-control" onClick={this.submitHandler}>Create</button>
            </form>
          </div>  
        )}
    </div>
    ) 
  }
}

export default ExamWidget;