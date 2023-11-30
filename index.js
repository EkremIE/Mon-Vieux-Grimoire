const express = require('express');
const app = express();
const {User} = require("./db/mongo.js");
const cors = require('cors');
const bcrypt = require('bcrypt');


const PORT = 4000;

app.use(cors());
app.use(express.json());

function sayHi(req, res) {
    res.send('Hello World!');
}

app.get('/', sayHi);
app.post('/api/auth/signup', signUP);
app.post('/api/auth/login', login);

app.listen(PORT, function () {
    console.log(`Server is running on: ${PORT}`);
});



async function signUP (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const userInDB = await User.findOne({
        email: email
    });
    if (userInDB != null) {
        res.status(400).send("Email already exists");
        return;
    }
    const user = {
        email: email,
        password: hashPassword(password) // TODO: hash password
    }
    try {
        await User.create(user);
    }
    catch (e) {
        console.error(e);
        res.status(500).send("Internal error");
        return;
    }
    res.send("SignUP");
} 



async function login (req, res) {
    const body = req.body;

    const userInDB = await User.findOne({
        email: body.email
    });
    if (userInDB == null) {
        res.status(401).send("Wrong email")
        return;
    }


    const passwordInDB = userInDB.password;
    if (!isPasswordCorrect(req.body.password, passwordInDB)) {
        res.status(401).send("Wrong password")
        return;
    }
    res.send({
        userId: "userInDB._id",
        token: "token"
    })
}

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function isPasswordCorrect(password, hash) {
    return bcrypt.compareSync(password, hash);
}