
//user model
module.exports = (sequelize, DataTypes) => {
    const Survey = sequelize.define( "survey", {
        // attributes: email:str, repo:str, commit_sha:str
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'users',
                key: 'email'
            }
        },
        repo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        commit_sha: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {timestamps: true}, )
    return Survey
 }