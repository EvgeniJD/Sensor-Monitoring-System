const {
    sensorParamsEmitingHandler,
    disableSensorActivity,
    enableSensorActivity,
    getSensorId
} = require('./services/socket');

const Sensor = require('./Sensor');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected !');

        Sensor.findAll({ attributes: ['name', 'id'] })
            .then((sensors) => {
                if (sensors.length > 0) {
                    sensors.forEach(sensor => {
                        socket.on(`${sensor.name} getId`, getSensorId);
                        socket.on(`${sensor.name}|${sensor.id}`, sensorParamsEmitingHandler);
                    });
                }
            });

        socket.on('start_sensor', enableSensorActivity);
        socket.on('pause_sensor', disableSensorActivity);

        socket.on('disconnect', () => { console.log('user disconnected !'); });
    });
};