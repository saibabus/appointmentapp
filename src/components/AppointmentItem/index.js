import './index.css'

const AppointmentItem = props => {
  const {eachappointment, isstareditem} = props
  const {id, title, date, isstared} = eachappointment
  const onClikstared = () => {
    isstareditem(id)
  }
  const starimg = isstared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointmenteach">
      <div className="name-star-conatiner">
        <p className="title-heading">{title}</p>
        <button
          type="button"
          className="startappointmenteach"
          onClick={onClikstared}
          testid="star"
        >
          <img src={starimg} className="img-star" alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
