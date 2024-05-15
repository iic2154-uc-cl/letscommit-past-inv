const userRoutes = require ('./user')
const messageRoutes = require ('./message')
const assignmentRoutes = require ('./assignment')
const commitRoutes = require ('./commit')
const surveyRoutes = require ('./survey')
const botsRoutes = require ('./bots')
const selectionRoutes = require ('./selection')
const calificationRoutes = require ('./calification')

const applyRoutes = (app, dir) => {
    app.use(dir+'/users', userRoutes)
    app.use(dir+'/message', messageRoutes)
    app.use(dir+'/assignment', assignmentRoutes)
    app.use(dir+'/commit', commitRoutes)
    app.use(dir+'/survey', surveyRoutes)
    app.use(dir+'/bots', botsRoutes)
    app.use(dir+'/selection', selectionRoutes)
    app.use(dir+'/calification', calificationRoutes)
}

module.exports = applyRoutes