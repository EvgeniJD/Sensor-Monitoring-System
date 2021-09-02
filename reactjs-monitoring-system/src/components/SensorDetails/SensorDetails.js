import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

import GraphLiveData from '../GraphLiveData';
import Graph24Data from '../Graph24Data';

import sensorServices from '../../services/sensor';
import server from '../../server';

import './SensorDetails.css';

function SensorDetails({ disableSensorActivity, startSensorActivity, ...sensor }) {
    const [liveData, setLiveData] = useState([]);
    const [humidity, setHumidity] = useState();
    const [temperature, setTemperature] = useState();
    const [data24LastHours, setData24LastHours] = useState([]);

    const socketRef = useRef();

    useEffect(() => {
        sensorServices.get24Data(sensor.id).then(setData24LastHours);

        socketRef.current = io(server.socketURL);

        socketRef.current.on(`${sensor.name}|${sensor.id}`, (sensorData) => {
            sensorServices.getLiveData(sensor.id).then(setLiveData);

            setHumidity(sensorData.hum);
            setTemperature(sensorData.temp);
        });

        socketRef.current.on(`pause_sensor_${sensor.id}`, (id) => {
            console.log(`DISABLE SENSOR ${id} ACTIVITY !`);
            disableSensorActivity(sensor.id);
        });

        socketRef.current.on(`start_sensor_${sensor.id}`, (id) => {
            console.log(`START SENSOR ${id} ACTIVITY !`);
            startSensorActivity(sensor.id);
        });

        return () => {
            socketRef.current.disconnect();
        }
        // eslint-disable-next-line
    }, []);

    const toggleSensorActivity = () => {
        if (sensor.active) {
            socketRef.current.emit('pause_sensor', sensor.id);
        } else {
            socketRef.current.emit('start_sensor', sensor.id);
        }
    };

    return (
        <tr className="sensor_details">
            <td colSpan="3">
                <article>

                    <GraphLiveData
                        sensor={sensor}
                        liveData={liveData}
                        humidity={humidity}
                        temperature={temperature}
                        toggleSensorActivity={toggleSensorActivity}
                    />

                    <Graph24Data data24LastHours={data24LastHours} />

                </article>
            </td>
        </tr>
    )
}

export default SensorDetails;