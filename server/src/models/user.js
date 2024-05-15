
//user model
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define( "user", {
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true, //checks for email format
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {timestamps: true}, )
    return User
 }