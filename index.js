const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config();

const expense = require('./routes/expenseroute');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(errorHandlerMiddleware);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({extended: false}))
app.use("/uploads", express.static('uploads'))

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port: ${port}`))
    } catch (error) {
        console.log(error)
    }
}

app.use('/api/expenses', expense);

start();
