import './GraphLiveData.css';
import { AreaChart, Tooltip, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
import Loader from '../Loader';

function GraphLiveData({
    sensor,
    liveData,
    humidity,
    temperature,
    toggleSensorActivity
}) {

    return (
        <article className="live_data_wrapper">
            <article className="live_data_graph">

                {sensor.active && liveData.length > 0 &&
                    <>
                        <div className="hum_real">
                            <p>Humidity</p>
                            <p className="real_data">{humidity}%</p>
                        </div>
                        <div className="temp_real">
                            <p>Temperature</p>
                            <p className="real_data">{temperature}°C</p>
                        </div>
                    </>
                }
                {sensor.active && liveData.length === 0 &&
                    <>
                        <div className="hum_real">
                            <Loader />
                        </div>
                        <div className="temp_real">
                            <Loader />
                        </div>
                    </>
                }
                
                <h1>Live data</h1>
                <AreaChart width={500} height={250} data={liveData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="temp" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="hum" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </article>
            <article className="live_data_cta">
                {sensor.active && liveData.length === 0 && <button onClick={toggleSensorActivity} className="live_data_cta_btn connecting_btn" type="button">Connecting...</button>}
                {sensor.active && liveData.length > 0 && <button onClick={toggleSensorActivity} className="live_data_cta_btn disable_btn" type="button">Disable Sensor</button>}
                {!sensor.active && <button onClick={toggleSensorActivity} className="live_data_cta_btn enable_btn" type="button">Enable Sensor</button>}
            </article>
        </article >
    )

};

export default GraphLiveData;