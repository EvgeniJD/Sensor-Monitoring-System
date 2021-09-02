import socket from './socket-config';
import elementsService from "./elementsService";
import sensorParamsEmitter from './sensorParamsEmitter';
import variables from './variables';

const socketHandlers = () => {
    socket.on("connect", () => {
        socket.emit(`${variables.sensorName} getId`, variables.sensorName);
    });

    socket.on(`${variables.sensorName} getId`, (id) => {
        id === 'no name match' ? socket.disconnect() : variables.sensorId = id;

        initRestSocketHandlers();
    });


    const initRestSocketHandlers = () => {
        socket.on(`start_sensor_${variables.sensorId}`, () => {
            clearInterval(variables.sensorIntervalID);
            variables.sensorIntervalID = setInterval(sensorParamsEmitter, 5000);

            elementsService.setStartingDisplayView();
        });

        socket.on(`pause_sensor_${variables.sensorId}`, () => {
            clearInterval(variables.sensorIntervalID);

            elementsService.setPauseDisplayView();
        });

        socket.on('disconnect', () => {
            clearInterval(variables.sensorIntervalID);
        });
    };
};

export default socketHandlers;