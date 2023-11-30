const {User} = require('../models/User');
const bcrypt = require('bcrypt');
const express = require('express');

async function signUP (req, res) {
    console.log("signup:",req.body);
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
    console.log("login:",req.body);
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
        userId: userInDB._id,
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

const usersRouter = express.Router();
usersRouter.post("/signup", signUP);
usersRouter.post("/login", login);



module.exports = {usersRouter};