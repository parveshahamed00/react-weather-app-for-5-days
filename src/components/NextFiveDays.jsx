export default function NextFiveDays(props) {
  return (
    <div className="day" >
      <p className="date">{props.date}</p>
      <img className="day-icon" src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`} ></img>
      <p className="day-celcius">
       {props.celcius} &deg;C.
      </p>
    </div>
  );
}
