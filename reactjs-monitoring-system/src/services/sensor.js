import server from '../server';

const sensorServices = {
  creteSensor: (sensor) => {
    return fetch(server.URL, {
      method: 'POST',
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sensor)
    })
      .then(res => res.json())
      .catch(e => console.log('ERROR ON CREATE SENSOR: ', e))
  },
  getSensors: () => {
    return fetch(server.URL)
      .then(res => res.json())
      .catch(e => console.log('FETCHING SENSORS ERROR: ', e))
  },
  get24Data: (sensorId) => {
    return fetch(`${server.URL}${sensorId}${server.data24Endpoint}`)
      .then(res => res.json())
      .catch(e => console.log('ERROR FROM FETCH SENSOR 24 DATA: ', e));
  },
  getLiveData: (sensorId) => {
    return fetch(`${server.URL}${sensorId}${server.dataLiveEndpoint}`)
      .then(res => res.json())
      .catch(e => console.log('ERROR FROM FETCH SINGLE SENSOR LIVE DATA: ', e));
  }

}

export default sensorServices;