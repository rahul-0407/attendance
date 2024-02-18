const mongoose = require("mongoose")

const mongoURI = "mongodb://0.0.0.0:27017";

const connectDB = async () => {
    await mongoose.connect(mongoURI,{
        dbName:'attendance',
    })
    .then(()=> console.log(`databse connected`))
    .catch((error) => console.log(error))
}

module.exports = connectDB