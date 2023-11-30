const {app} = require('./config/app.js');
const {usersRouter} = require('./Controllers/users.control.js');
const {booksRouter} = require('./Controllers/books.control.js');
require('dotenv').config();
const mongoose = require("mongoose");


const DB_URL = "mongodb+srv://wawa:$xAyIVxTg0qgZYYvy@cluster0.6nec63w.mongodb.net/?retryWrites=true&w=majority";


const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("Server running!"));

app.use("/api/auth", usersRouter);
app.use("/api/books", booksRouter);

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));








