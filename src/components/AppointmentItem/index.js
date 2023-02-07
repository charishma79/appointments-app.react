// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, isStarToggled} = props
  const {textInput, date, isStarred, id} = appointmentDetails

  const starredItem = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    isStarToggled(id)
  }

  return (
    <li className="list-container">
      <div className="star-name-container">
        <p className="text">{textInput}</p>
        <button
          type="button"
          className="button"
          data-testid="star"
          onClick={onClickStar}
        >
          <img src={starredItem} alt="star" className="starred-image" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}

export default AppointmentItem
