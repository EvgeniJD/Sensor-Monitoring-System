## The technologies

This application is built with [SQLite](https://www.sqlite.org), [Sequelize](https://sequelize.org/), [Express.js](https://expressjs.com), [Node.js](https://nodejs.org/en/), [Webpack](https://webpack.js.org/), [React.js](https://reactjs.org) - also known as the **MERN** stack.

## The application

### Idea

System, which collects and monitor data from several sensors. Provides
persistence of collected data and allows user to monitor and control sensors.

### Design

Layout looks good on laptops / desktops.

### Endpoints

#### Sensors

* GET

    * `/sensors`
    * `/sensors/:id/24data`
    * `/sensors/:id/liveData`
* POST

    * `/sensors`