const sensorServices = require('./services/sensor');

module.exports = (app) => {

    app.post('/sensors', sensorServices.addSensor);
    app.get('/sensors', sensorServices.getSensors);

    app.get('/sensors/:id/24data', sensorServices.getSensor24Data);

    app.get('/sensors/:id/liveData', sensorServices.getSensorLiveData);
    
};