import './SensorForm.css';
import sensorServices from '../../services/sensor';
import { useState } from 'react';

function SensorForm({ updateSensors }) {

  const [error, setError] = useState(false);

  const sensorSubmitHandler = (e) => {
    e.preventDefault();

    const nameInputEl = e.target.name;
    const name = nameInputEl.value;

    if (!name) return;

    const sensor = { name, active: false }

    sensorServices.creteSensor(sensor)
      .then((sensor) => {
        if (sensor) {
          updateSensors(sensor);
          nameInputEl.value = '';
          setError(false);
        } else {
          setError(true);
        }
      })
  }

  return (
    <article className="form_wrapper">
      <form onSubmit={sensorSubmitHandler}>
        <fieldset>
          <legend>Sensor</legend>
          <input type="text" placeholder="name" name="name" />
          <button className="add_sensor_btn">ADD</button>
        </fieldset>
      </form>
      {error && <p className="error_msg">Sensor with that name already exist !</p>}
    </article>
  )
};

export default SensorForm;