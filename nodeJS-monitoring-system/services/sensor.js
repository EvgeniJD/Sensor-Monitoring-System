const Sensor = require('../Sensor');

const addSensor = (req, res) => {
    const { name, active } = req.body;
    if (!name || active === undefined) return;

    Sensor.findOne({ where: { name: req.body.name } })
        .then((result) => {
            if (result) {
                return res.send(null);
            };

            Sensor.create(req.body)
                .then((sensor) => {
                    res.status(201).send(sensor);
                });
        })
};

const getSensors = (req, res) => {
    Sensor.findAll({ attributes: ['active', 'name', 'id'] })
        .then((sensors) => {
            res.send(sensors);
        });
};

const getSensor24Data = (req, res) => {
    Sensor.findOne({ where: { id: req.params.id } })
        .then((sensorData) => sendSensorData(sensorData, '24hours', req, res))
        .catch(e => console.log('ERROR ON GET 24 SENSOR DATA: ', e));
}

const getSensorLiveData = (req, res) => {
    Sensor.findOne({ where: { id: req.params.id } })
        .then((sensorData) => sendSensorData(sensorData, 'live', req, res))
        .catch(e => console.log('ERROR ON GET SINGLE SENSOR DATA: ', e));
}

const sendSensorData = (sensorData, timeBefore, req, res) => {
    const timeInterval = timeBefore === '24hours' ? 86400000 : 60000;
    const wantedTime = Date.now() - timeInterval;
    let params = JSON.parse(sensorData.parametersData);

    params = params
        .filter(par => par.timestamp > wantedTime)
        .map(par => ({ ...par, timestamp: new Date(par.timestamp).toLocaleString() }));

    res.send(params);
}

module.exports = {
    addSensor,
    getSensors,
    getSensor24Data,
    getSensorLiveData
}