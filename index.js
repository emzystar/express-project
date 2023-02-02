require('dotenv').config();
const express = require('express');
const app = express();
port = 4090;
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const taskRouter = require('./routes/taskRouter')
const notFound = require('./middleware/notFoundRoute');
const errorHandler = require('./middleware/errorHandler');



// middleware
app.use(express.json());


// routes
app.use("/api/v1/tasks", taskRouter)
app.use(errorHandler)



// error route
app.use(notFound);


// DB connection
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        app.listen(port, () => {
            console.log(`server running on port ${port}...`);
        })
    } catch (error) {
        console.log(error);

    }
}
startServer()