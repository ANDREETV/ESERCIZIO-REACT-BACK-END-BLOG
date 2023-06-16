const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


require('dotenv').config();




const app = express();





// Middlewares
app.use(cors());
app.use(express.json());


const debug = require("./middlewares/debug")
app.use(debug.logUrl);



// EndPoints
const usersEndPoints = require('./endpoints/Users_EndPoints')
const authEndPoints = require('./endpoints/Auth_EndPoints')
const endPoints = require("./endpoints/Posts_EndPoints")
app.use(usersEndPoints);
app.use(authEndPoints);
app.use(endPoints);






// Middleware ErrorHandler
app.use(debug.errorHandler);

mongoose
    .connect(process.env.DATABASE_URL)
    .then(response => {
        console.log("DB Connected...");
        app.listen(3000, async () => console.log("Server listening on port " + 3000))
    }).catch(err => console.log(err))