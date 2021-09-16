import {Component} from 'react'
import {v4 as uniquev4id} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

// Write your code

class Appointments extends Component {
  state = {appointmentList: [], title: '', newdate: '', isFavourite: false}

  onstarfilter = () => {
    const {isFavourite} = this.state
    this.setState({isFavourite: !isFavourite})
  }

  getfilteredappointments = () => {
    const {isFavourite, appointmentList} = this.state

    if (isFavourite === true) {
      return appointmentList.filter(each => each.isstared === true)
    }
    return appointmentList
  }

  onsubmitdata = event => {
    event.preventDefault()
    const {title, newdate} = this.state
    const formateddate = newdate
      ? format(new Date(newdate), 'dd MMMM yyyy, EEEE')
      : ''

    const newappointment = {
      id: uniquev4id(),
      title,
      date: formateddate,
      isstared: false,
    }
    this.setState(prevstate => ({
      appointmentList: [...prevstate.appointmentList, newappointment],
      title: '',
      newdate: '',
    }))
  }

  isstareditem = id => {
    this.setState(prevstate => ({
      appointmentList: prevstate.appointmentList.map(eachone => {
        if (id === eachone.id) {
          return {...eachone, isstared: !eachone.isstared}
        }
        return eachone
      }),
    }))
  }

  onChangedate = event => this.setState({newdate: event.target.value})

  onChangetitle = event => this.setState({title: event.target.value})

  render() {
    const {title, isFavourite, newdate, appointmentList} = this.state
    const filteredappointments = this.getfilteredappointments(appointmentList)
    const activestart = isFavourite ? 'stared-button active' : 'stared-button'

    return (
      <div className="appointments-app">
        <div className="appointments-content">
          <h1 className="heading">Add Appointment</h1>

          <div className="userinput-img-container">
            <form className="form" onSubmit={this.onsubmitdata}>
              <label className="label-title-date" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                className="input-date"
                value={title}
                id="title"
                placeholder="Title"
                onChange={this.onChangetitle}
              />
              <label className="label-title-date" htmlFor="date">
                DATE
              </label>
              <input
                type="date"
                className="input-date"
                value={newdate}
                id="date"
                onChange={this.onChangedate}
              />
              <div>
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
            <img
              className="appointment-img"
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>
          <hr className="line-comment" />
          <div className="appointment-star-container">
            <h1 className="list-heading">Appointments</h1>
            <button
              className={activestart}
              type="button"
              onClick={this.onstarfilter}
            >
              Starred
            </button>
          </div>

          <ul className="appointmentscontainer">
            {filteredappointments.map(eachappointment => (
              <AppointmentItem
                eachappointment={eachappointment}
                key={eachappointment.id}
                isstareditem={this.isstareditem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
