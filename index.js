const {app} = require('./config/app.js');
const {usersRouter} = require('./Controllers/users.control.js');
const {booksRouter} = require('./Controllers/books.control.js');


app.get('/', (req, res) => res.send('serv is up'));


app.use("/api/auth", usersRouter);
app.use("/api/books", booksRouter);







