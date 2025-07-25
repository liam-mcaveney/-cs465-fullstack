const mongoose = require('mongoose');
const readLine = require('readline');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Build the connection string and set a connection timeout
const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {}), 1000);
};

// Monitor connection events
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Windows specific listener for Ctrl+C
if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

// Graceful shutdown function
const gracefulShutdown = (msg) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
    });
};

// Nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
});

// App termination (Ctrl+C)
process.on('SIGINT', () => {
    gracefulShutdown('app termination');
    process.exit(0);
});

// Docker or other external shutdowns
process.on('SIGTERM', () => {
    gracefulShutdown('app shutdown');
    process.exit(0);
});

// Make initial connection to DB
connect();

// Load the Mongoose model
require('./travlr');

module.exports = mongoose;
