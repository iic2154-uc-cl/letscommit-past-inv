//importing modules
const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const db = require('./src/models')
const applyRoutes = require('./src/routes')
const cors = require('cors')


//setting up your port
const PORT = process.env.PORT || 8080

//assigning the variable app to express
const app = express()

app.use(bodyParser.json({ limit: "80mb" }));
app.use(bodyParser.urlencoded({ limit: "80mb", extended: true }));

//cors
app.use(
    cors({
        origin:['http://localhost:3000','http://127.0.0.1:3000','http://aicommit.ing.puc.cl'],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type","Authorization"],
    })
);

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: true }).then(() => {
    console.log("db has been re sync")
})

//routes for the assignment API
// hello world
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//routes for the user API
applyRoutes(app, '/api');

// 404 error handler
app.use((req, res, next) => {
    res.status(404).send('404: Page not found');
});

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))