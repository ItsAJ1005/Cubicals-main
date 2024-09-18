require('dotenv').config();
const mongoose = require('mongoose');

class Database {
    constructor() {
        this.mongoURI = process.env.MONGO_URI;
    }

    async connect() {
        try {
            await mongoose.connect(this.mongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to DB');
        } catch (error) {
            console.error('DB connection error:', error);
            process.exit(1);  // Exit process with failure if DB connection fails
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
            console.log('Disconnected from DB');
        } catch (error) {
            console.error('Error disconnecting from DB:', error);
        }
    }
}

module.exports = new Database();
