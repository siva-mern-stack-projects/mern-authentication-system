const mongoose = require('mongoose');

const connectDB = async () => {
    try {

    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb Connected : ${db.connection.host}`);

    } catch(err) {
        console.log(`DB Connection error :${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;