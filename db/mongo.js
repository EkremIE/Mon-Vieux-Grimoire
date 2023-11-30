require('dotenv').config();

const mongoose = require("mongoose");  


const DB_URL =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_DOMAIN}`;
console.log("DB_URL:",DB_URL);



async function connect() {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to DB");
    }
    catch (e) {
        console.error(e);
    }
}

connect();


const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);


module.exports = {User};