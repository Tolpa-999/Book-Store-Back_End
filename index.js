

const express = require("express");
const app = express();

require("dotenv").config()
const cors = require("cors");
const userRoute = require("./routes/user.routes");
const booksRoute = require("./routes/book.routes");
const { mongoose } = require("mongoose");

const cookieParser = require('cookie-parser');




mongoose.connect(process.env.DBURL)
    .then(() => console.log("DB Conected")
    ).catch((err) => console.error(err))

app.use(express.json())
app.use(cookieParser())
app.use(cors());

app.use('/users', userRoute)

app.use('/books', booksRoute)

app.use((err, req, res, next) => {
    res.json(err)
})







app.listen(process.env.PORT, () => {
    console.log(" listing On Port : ", process.env.PORT)
})

module.exports = app;