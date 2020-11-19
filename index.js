const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const config = require('config');
const appConfig = config.get('appConfig');

// Database Connection
require('./Databases/mongodb')();

// Router
const router = require('./Routes/router')(app);

//Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
          status: err.status || 500,
          message: err.message
        }
    });
});

const PORT = appConfig.port || 3000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});


