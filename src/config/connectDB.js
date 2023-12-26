const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hoidanit', 'root', 'abc123', {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: '3307',
    logging: false
})

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to db successfully!');
    } catch (error) {
        console.log(`Unable to connect to db: ${error}`);
    }
}

module.exports = connectDB;