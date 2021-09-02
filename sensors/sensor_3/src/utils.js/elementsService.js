import elements from "./elements";
import variables from "./variables";

const setInitDisplayView = () => {
    elements.titleEl.innerHTML = `${variables.sensorName} DISABLED!`;
    elements.sensorNameEl.innerHTML = variables.sensorName;
    elements.notificationEl.innerHTML = 'DISABLED !';
    elements.paramsEl.style.display = 'none';
    elements.emitterEl.style.display = 'none';
};

const setStartingDisplayView = () => {
    elements.titleEl.innerHTML = `${variables.sensorName} Loading...`;
    elements.notificationEl.innerHTML = 'Loading...';
    elements.notificationEl.style.backgroundColor = 'lightgray';
};

const setPauseDisplayView = () => {
    elements.titleEl.innerHTML = `${variables.sensorName} DISABLED!`;
    elements.notificationEl.style.display = 'block';
    elements.notificationEl.innerHTML = 'DISABLED !';
    elements.notificationEl.style.backgroundColor = 'salmon';
    elements.paramsEl.style.display = 'none';
    elements.emitterEl.style.display = 'none';
};

const setEmittingDisplayView = () => {
    elements.titleEl.innerHTML = `${variables.sensorName} ENABLED! ${variables.hum}% | ${variables.temp}°C`;
    elements.tempEl.innerHTML = variables.temp + '°C';
    elements.humEl.innerHTML = variables.hum + '%';
    elements.paramsEl.style.display = 'block';

    elements.notificationEl.style.display = 'none';
    elements.emitterEl.style.display = 'block';
    // elements.notificationEl.innerHTML = 'ENABLED !';
    // elements.notificationEl.style.backgroundColor = '#b1f436';
}

const elementsService = {
    setInitDisplayView,
    setStartingDisplayView,
    setPauseDisplayView,
    setEmittingDisplayView
};

export default elementsService;