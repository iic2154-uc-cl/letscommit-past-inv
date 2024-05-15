//importing modules
const {Sequelize, DataTypes} = require('sequelize')

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5433
//database name is discover
const sequelize = new Sequelize(process.env.db_uri, {dialect: "postgres"})

//checking if connection is done
    sequelize.authenticate().then(() => {
        console.log(`Database connected to discover`)
    }).catch((err) => {
        console.log(err)
    })

    const db = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize

//connecting to model
db.users = require('./user') (sequelize, DataTypes)
db.commits = require('./commit') (sequelize, DataTypes)
db.surveys = require('./survey') (sequelize, DataTypes)
db.questions = require('./question') (sequelize, DataTypes)
db.messages = require('./message') (sequelize, DataTypes)
db.assignments = require('./assignment') (sequelize, DataTypes)
db.selections = require('./selection') (sequelize, DataTypes)
db.califications = require('./calification') (sequelize, DataTypes)

//exporting the module
module.exports = db