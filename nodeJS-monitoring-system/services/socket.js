const Sensor = require('../Sensor');
const io = require('../index');

function getSensorId(name) {
    Sensor.findOne({ where: { name: name } })
        .then((sensor) => {
            const id = sensor.id || 'no name match';

            io.emit(`${sensor.name} getId`, id);
        })
        .catch(e => console.log('ERROR FROM GET SENSOR ID: ', e));
}

async function sensorParamsEmitingHandler(sensorData) {
    const { id, temp, hum, timestamp } = sensorData;

    let sensor;
    try {
        sensor = await Sensor.findOne({ where: { id: id } });
        if (sensor) {
            const oldParams = JSON.parse(sensor.parametersData);
            oldParams.push({ timestamp, temp, hum });
            sensor.parametersData = JSON.stringify(oldParams);
    
            await sensor.save();
    
            io.emit(`${sensor.name}|${id}`, sensorData);
        }
    } catch (error) {
        console.log(`Sensor with ID: ${id} Throw Error On Update Parameters: `, error);
    };
};

function enableSensorActivity(id) {
    Sensor.update({ active: true }, { where: { id: id } })
        .then(() => {
            io.emit(`start_sensor_${id}`, id);
        })
        .catch(e => console.log('START SENSOR ERROR: ', e));
}

function disableSensorActivity(id) {
    Sensor.update({ active: false }, { where: { id: id } })
        .then(() => {
            io.emit(`pause_sensor_${id}`, id);
        })
        .catch(e => console.log('DISABLE SENSOR ERROR: ', e));
};


module.exports = {
    getSensorId,
    sensorParamsEmitingHandler,
    enableSensorActivity,
    disableSensorActivity
};