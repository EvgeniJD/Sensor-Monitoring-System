import { useState } from 'react';
import SensorDetails from '../SensorDetails';
import './SensorRow.css';

function SensorRow(sensorData) {
    const [showMoreInfo, setShowMoreInfo] = useState(false);

    return (
        <>
            <tr className="tr_beige" onClick={() => setShowMoreInfo(oldState => !oldState)}>
                <td>{sensorData.active
                    ? <span className="dot green"></span>
                    : <span className="dot gray"></span>}</td>
                <td>{sensorData.name}</td>
                <td>{sensorData.id}</td>
            </tr>
            {showMoreInfo &&
             <SensorDetails
                {...sensorData}
            />}
        </>
    )
}

export default SensorRow;