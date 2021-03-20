import React from 'react';
import { safeCredentialsWithOutContentTypeAndAccept, handleErrors } from '@util/fetchHelper';
import Loading from '@util/loading';
import { Link } from 'react-router-dom'

class SpecialClass extends React.Component {

  state = {
    laoding: true,
    students: [],
    class: null,
    add_student: false,
    student_id: '',
    full_name: '',
    phone: '',
    gender: 'Male',
    address: '',
    birthday: '',
    parent_id: ''
  }

  photoFile = React.createRef()
  
  componentDidMount () {

    // get students
    fetch(`/api/students?glass=${this.props.match.params.id}`).then(handleErrors).then(data => {
      if (data.students) {
        this.setState({ loading: false, students: data.students })
      }
    })

    // get class info
    fetch(`/api/glasses/${this.props.match.params.id}`).then(handleErrors).then(data => {
      if (data.class) {
        this.setState({ class: data.class })
      }
    })
  }

  toggleAddStudent = () => {
    this.setState({ add_student: !this.state.add_student })
  }

  changeHandler = (event) => {
    const { name, value } =  event.target;
    this.setState({ [name]: value })
  }

  submitHandler = (event) => {
    event.preventDefault()

    const { student_id, full_name, phone, gender, address, birthday, parent_id } = this.state;
    const glass_id = this.props.match.params.id;
    const photo = this.photoFile.current.files[0];
    
    const formData = new FormData();
    if (student_id) {formData.append('student[student_id]', student_id)}
    if (full_name) {formData.append('student[full_name]', full_name)}
    if (phone) {formData.append('student[phone]', phone)}
    if (gender) {formData.append('student[gender]', gender)}
    if (address) {formData.append('student[address]', address)}
    if (birthday) {formData.append('student[birthday]', birthday)}
    if (parent_id) {formData.append('student[parent_id]', parent_id)}
    formData.append('student[glass_id]', glass_id);
    if (photo) {formData.append('student[photo]', photo)}
   
    fetch('/api/students', safeCredentialsWithOutContentTypeAndAccept({
      method: 'POST',
      body: formData
    })).then(handleErrors).then(data => {
      if (data.student) { this.setState({ students: this.state.students.concat(data.student), class: {class_name: this.state.class.class_name, number_of_students: this.state.class.number_of_students + 1 }}) }
      this.toggleAddStudent()
    })
  }

  render () {
    const { student_id, full_name, phone, gender, address, birthday, parent_id } = this.state;
    return (
      <div className="row m-0 mt-2" id="special-class">
        <div className="col-12">
          <div className="additions d-flex justify-content-between align-items-center">
            <div>
              {this.state.class && (<h6><b>{this.state.class.class_name}</b> - {this.state.class.number_of_students} <small>students</small></h6>)}
            </div>
            <button className="btn btn-primary ml-2" style={{backgroundColor: '#212529'}} onClick={this.toggleAddStudent}>
              + Add Student
            </button>
          </div>
        </div>
        <div className="col-12 p-0">
          <table className="table mt-3 mb-0 p-0">
            <thead>
             <tr className="text-center">
               <th>id</th>
               <th>Full Name</th>
               <th>Student Phone</th>
               <th>Parent Phone</th>
            </tr>
           </thead>
          </table>
        </div>
         <div className="col-12 p-0 wrap" style={{height: 'calc(100vh - 200px)'}}>
          <table className="table table-hover">
                <tbody>
                  {this.state.students && this.state.students.map(student => (
                    <tr key={student.id}>
                      <th>#{student.student_id}</th>
                      <td><Link to={`/app/classes/${this.props.match.params.id}/students/${student.id}`} style={{color: 'black', fontWeight: 'normal'}}>{student.full_name}</Link></td>
                      <td>{student.phone}</td>
                      <td>{student.parent_phone}</td>
                    </tr>
                  ))}
                  {this.state.loading && <Loading />}
                </tbody>
            </table>
         </div>
        
        {this.state.add_student && (
          <div className="box-popup" id="myForm">
            <form onSubmit={this.submitHandler} className="form-group form-popup" style={{maxWidth: '500px', maxHeight: '620px'}}>
                <h3 className="font-weight-bold text-center my-3">Create New Student</h3>
                <input
                    className="form-control mb-3"
                    type="text"
                    name="student_id"
                    placeholder="Student Id"
                    value={student_id}
                    onChange={this.changeHandler}
                    required
                  />
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
                    type="phone"
                    name="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={this.changeHandler}
                    required
                  />
                  <select className="form-control mb-3" name="gender" value={gender} onChange={this.changeHandler}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <input
                    className="form-control mb-3"
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={address}
                    onChange={this.changeHandler}
                    required
                  />
                  <input
                    className="form-control mb-3"
                    type="date"
                    min="1970-01-01"
                    max="2020-01-01"
                    name="birthday"
                    placeholder="Birtdhay"
                    value={birthday}
                    onChange={this.changeHandler}
                    required
                  />
                  <input
                    className="form-control mb-3"
                    type="text"
                    name="parent_id"
                    placeholder="Parent Id"
                    value={parent_id}
                    onChange={this.changeHandler}
                    required
                  />
                 <label className="ml-3">Photo </label> <input
                    className="form-control mb-3"
                    type="file"
                    ref={this.photoFile}
                  />
                <button className="btn btn-danger form-control mb-1" onClick={this.toggleAddStudent}>Cancel</button>
                <button className="btn btn-success form-control" onClick={this.submitHandler}>Create</button>
            </form>
          </div> 
        )}
      </div>
    )
  }
}

export default SpecialClass;