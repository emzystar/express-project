require('dotenv').config();
const express = require('express');
const app = express();
port = 4090;
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const taskRouter = require('./routes/taskRouter')



// middleware
app.use(express.json());


// routes
app.use("/api/v1/tasks", taskRouter)



// error route
app.use((req,res) => {
    res.status(404).json({message:'route not found'});
})


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