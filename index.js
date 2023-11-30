const {app} = require('./config/app.js');
const {usersRouter} = require('./Controllers/users.control.js');
const {booksRouter} = require('./Controllers/books.control.js');
require('./db/mongo.js');

const PORT = process.env.PORT || 4000;


app.get('/', (req, res) => res.send('serv is up'));


app.use("/api/auth", usersRouter);
app.use("/api/books", booksRouter);


app.listen(PORT, function () {
    console.log(`Server is running on: ${PORT}`);
});








