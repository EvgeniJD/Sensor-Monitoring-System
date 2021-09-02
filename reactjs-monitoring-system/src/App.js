import { useState, useEffect } from 'react';
import Header from './components/Header';
import SensorsTable from './components/SensorsTable';
import SensorForm from './components/SensorForm';
import sensorServices from './services/sensor';
import './App.css';

function App() {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    sensorServices.getSensors().then(setSensors);
  }, [])

  const updateSensors = (sensor) => {
    setSensors(prevData => ([...prevData, sensor]));
  }

  const startSensorActivity = (id) => {
    const sensorsCopy = sensors.slice();
    const sensor = sensorsCopy.find(sensor => sensor.id === id);
    if (sensor) {
      sensor.active = true;
      setSensors(sensorsCopy);
    }
  }

  const disableSensorActivity = (id) => {
    const sensorsCopy = sensors.slice();
    const sensor = sensorsCopy.find(sensor => sensor.id === id);
    if (sensor) {
      sensor.active = false;
      setSensors(sensorsCopy);
    }
  }


  return (
    <div className="App">
      <Header />

      <SensorsTable
        sensors={sensors}
        disableSensorActivity={disableSensorActivity}
        startSensorActivity={startSensorActivity}
      />

      <SensorForm updateSensors={updateSensors} />
    </div>
  );
}

export default App;
