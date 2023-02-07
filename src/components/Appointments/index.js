// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

// console.log(format(new Date(2021, 19, 07), 'dd MMMM yyyy, EEEE'))

import './index.css'

class Appointments extends Component {
  state = {
    textInput: '',
    dateInput: '',
    appointmentsList: [],
    isFiltered: false,
  }

  onFilter = () => {
    const {isFiltered} = this.state
    this.setState({isFiltered: !isFiltered})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {textInput, dateInput} = this.state
    const date = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: v4(),
      textInput,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      textInput: '',
      dateInput: '',
    }))
  }

  onStarToggle = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onChangeTextInput = event => {
    this.setState({
      textInput: event.target.value,
    })
  }

  onChangeDateInput = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  getFilteredAppointments = () => {
    const {appointmentsList, isFiltered} = this.state
    if (isFiltered) {
      return appointmentsList.filter(each => each.isStarred === true)
    }
    return appointmentsList
  }

  render() {
    const {textInput, dateInput, isFiltered} = this.state
    const filterClassName = isFiltered ? 'filter-filled' : 'filter-empty'
    const filteredAppointments = this.getFilteredAppointments()

    return (
      <div className="bg-container">
        <div className="appointment-bg-container">
          <div className="card-container">
            <div className="appointment-card">
              <h1 className="heading">Add Appointment</h1>
              <form
                className="appointment-form-container"
                onSubmit={this.onAddAppointment}
              >
                <label htmlFor="input-box" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  className="purpose"
                  value={textInput}
                  placeholder="Title"
                  onChange={this.onChangeTextInput}
                  id="input-box"
                />
                <label htmlFor="date-box" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  className="purpose"
                  value={dateInput}
                  placeholder="dd/mm/yyyy"
                  onChange={this.onChangeDateInput}
                  id="date-box"
                />
                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>

          <hr className="seperator" />
          <div className="appointments-list-container">
            <h1 className="main-heading">Appointments</h1>

            <button
              type="button"
              className={`btn ${filterClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>

          <ul className="comment-card-container">
            {filteredAppointments.map(eachItem => (
              <AppointmentItem
                appointmentDetails={eachItem}
                key={eachItem.id}
                isStarToggled={this.onStarToggle}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
