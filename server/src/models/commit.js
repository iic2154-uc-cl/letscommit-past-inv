
//user model
module.exports = (sequelize, DataTypes) => {
    const Commit = sequelize.define( "commit", {
        // attributes: sha:str, repo:str, author:str, diff:str
        sha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        repo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        diff: {
            type: DataTypes.TEXT, // Use TEXT data type for diff
            allowNull: false
        },
    }, {timestamps: true}, )
    return Commit
 }