const tempEl = document.querySelector('#temp');
const humEl = document.querySelector('#hum');
const sensorNameEl = document.querySelector('.notifications_sensor_name');
const notificationEl = document.querySelector('#notification');
const titleEl = document.querySelector('title');
const paramsEl = document.querySelector('.params');
const emitterEl = document.querySelector('.lds-ripple');

const elements = {
    tempEl,
    humEl,
    sensorNameEl,
    notificationEl,
    titleEl,
    paramsEl,
    emitterEl
}

export default elements;