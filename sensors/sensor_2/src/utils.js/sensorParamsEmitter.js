import socket from "./socket-config";
import variables from "./variables";
import elementsService from "./elementsService";

const sensorParamsEmitter = () => {
    elementsService.setEmittingDisplayView();

    const timestamp = Date.now();

    const sensorData = {
        id: variables.sensorId,
        temp: variables.temp,
        hum: variables.hum,
        timestamp
    };

    socket.emit(`${variables.sensorName}|${variables.sensorId}`, sensorData);

    if (Math.random() > 0.5) {
        variables.temp += 1;
        variables.hum += 1;
    } else {
        variables.temp -= 1;
        variables.hum -= 1;
    }

    if (variables.temp >= 50 || variables.temp <= 0) {
        variables.temp = 30;
        variables.hum = 70;
    }
};

export default sensorParamsEmitter;