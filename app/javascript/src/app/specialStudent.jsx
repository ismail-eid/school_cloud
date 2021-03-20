import React from 'react';
import { handleErrors, safeCredentialsWithOutContentTypeAndAccept } from '@util/fetchHelper';
import Loading from '@util/loading';
import './specialStudent.scss';

class SpecialStudent extends React.Component {
  state = {
    loading: true,
    student: [],
    update_student: false,
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
    fetch(`/api/students/${this.props.match.params.id}`).then(handleErrors).then(data => {
      if (data.student) {
          const {student} = data;

        this.setState({ student, loading: false, student_id: student.student_id, full_name: student.full_name, phone: student.phone, gender: student.gender, address: student.address, parent_id: student.parent_id, birthday: student.birthday })
      }
    })
  }

  toggleUpdateStudent = () => {
    this.setState({ update_student: !this.state.update_student})
  }

  changeHandler = (event) => {
    const { name, value } =  event.target;
    this.setState({ [name]: value })
  }

  submitHandler = (event) => {
    event.preventDefault()

    const { student_id, full_name, phone, gender, address, birthday, parent_id } = this.state;
    const glass_id = this.props.match.params.class_id;
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
    formData.append('student[id]', this.props.match.params.id)

   
    fetch('/api/students', safeCredentialsWithOutContentTypeAndAccept({
      method: 'PUT',
      body: formData
    })).then(handleErrors).then(data => {
      if (data.student) {
        const {student} = data;

      this.setState({ student, loading: false, student_id: student.student_id, full_name: student.full_name, phone: student.phone, gender: student.gender, address: student.address, parent_id: student.parent_id, birthday: student.birthday })

      this.toggleUpdateStudent()
       }
    })
  }

  render () {
    if (this.state.loading) {
     return <Loading />
    }

    const {student_id, full_name, phone, gender, class_name, address, birthday, parent_name, parent_phone, photo} = this.state.student;

    return (
      <div className="p-3" id="special-student">
        <div className="row m-0 border p-3">
        <div className="col-12 col-md-3">
          {photo && <div className="photo mb-3 m-md-0" style={{backgroundImage: `url(${photo})`}}></div>}
          {!photo && <div className="profile mb-3 m-md-0">{full_name.split(' ')[0][0] + full_name.split(' ')[1][0]}</div>}
        </div>
        <div className="col-12 col-md-9">
          <div className="row">
            <div className="col-12 col-md-6">
            <p><span className="font-weight-bold">Student Id:</span> #{student_id}</p>
            <p><span className="font-weight-bold">Full Name:</span> {full_name}</p>
            <p><span className="font-weight-bold">Class:</span> {class_name}</p>
            <p><span className="font-weight-bold">Student Phone:</span> {phone}</p>
            <p><span className="font-weight-bold">Gender:</span> {gender}</p>
            </div>
            <div className="col-12 col-md-6">
            <p><span className="font-weight-bold">Addres:</span> {address}</p>
            <p><span className="font-weight-bold">Birthday:</span> {birthday}</p>
            <p><span className="font-weight-bold">Parent Name:</span> {parent_name}</p>
            <p><span className="font-weight-bold">Parant Phone:</span> {parent_phone}</p>
            </div>
          </div>
        </div>
      </div>  
      <div className="row m-0 mt-2">
          <div className="col-12 p-0 text-right">
            <button className="btn btn-primary ml-2" style={{backgroundColor: '#212529'}} onClick={this.toggleUpdateStudent}>
              Update Student Info
            </button>
          </div>
        </div>
        {this.state.update_student && (
          <div className="box-popup" id="myForm">
            <form onSubmit={this.submitHandler} className="form-group form-popup" style={{maxWidth: '500px', maxHeight: '620px'}}>
                <h3 className="font-weight-bold text-center my-3">Update Student Info</h3>
                <input
                    className="form-control mb-3"
                    type="text"
                    name="student_id"
                    placeholder="Student Id"
                    value={this.state.student_id}
                    onChange={this.changeHandler}
                    required
                  />
                  <input
                    className="form-control mb-3"
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={this.state.full_name}
                    onChange={this.changeHandler}
                    required
                  />
                  <input
                    className="form-control mb-3"
                    type="phone"
                    name="phone"
                    placeholder="Phone"
                    value={this.state.phone}
                    onChange={this.changeHandler}
                    required
                  />
                  <select className="form-control mb-3" name="gender" value={this.state.gender} onChange={this.changeHandler}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <input
                    className="form-control mb-3"
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={this.state.address}
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
                    value={this.state.birthday}
                    onChange={this.changeHandler}
                    required
                  />
                  <input
                    className="form-control mb-3"
                    type="text"
                    name="parent_id"
                    placeholder="Parent Id"
                    value={this.state.parent_id}
                    onChange={this.changeHandler}
                    required
                  />
                 <label className="ml-3">Photo </label> <input
                    className="form-control mb-3"
                    type="file"
                    ref={this.photoFile}
                  />
                <button className="btn btn-danger form-control mb-1" onClick={this.toggleUpdateStudent}>Cancel</button>
                <button className="btn btn-success form-control" onClick={this.submitHandler}>Update</button>
            </form>
          </div> 
        )}
      </div>
    )
  }
}

export default SpecialStudent;