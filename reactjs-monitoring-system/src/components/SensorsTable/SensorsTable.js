import SensorRow from '../SensorRow';
import './SensorsTable.css';

function SensorsTable({sensors, ...handlers}) {
    return (
        <section>
            <h1 className="app_heading">Sensors</h1>

            <table className='sensorsTable'>
                <thead>
                    <tr className="tr_header">
                        <th className="statusColumn">STATUS</th>
                        <th>NAME</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    {sensors.map(sensor =>
                        <SensorRow
                            key={sensor.id}
                            {...sensor}
                            {...handlers}
                        />
                    )}
                </tbody>
            </table>
        </section>
    )
}

export default SensorsTable;