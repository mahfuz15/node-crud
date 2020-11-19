const mongoose = require('mongoose');

const config = require('config');
const mongoConfig = config.get('dbConfig.mongo_db');

module.exports = () => {

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);

    mongoose.connect('mongodb://'+mongoConfig.host+':'+mongoConfig.port+'/'+mongoConfig.dbName)
        .then(() => {
            console.log(`Connected to monogodb on port ${mongoConfig.port}...`);
        })
        .catch(err => {
            console.log("Error: " + err);
        })

    mongoose.connection.on('error', err => {
        console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected...');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose connection is disconnected due to app termination...');
            process.exit(0);
        });
    });
}
