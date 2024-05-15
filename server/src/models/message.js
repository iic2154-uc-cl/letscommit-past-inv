
//user model
module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define( "message", {
        // attributes: commit_id:int, message:str, promptv:str, giver:str
        commit_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'commits',
                key: 'id'
            }
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        promptv: {
            type: DataTypes.STRING,
            allowNull: false
        },
        giver: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {timestamps: true}, )
    return Message
 }