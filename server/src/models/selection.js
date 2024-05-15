
module.exports = (sequelize, DataTypes) => {
    const Selection = sequelize.define( "selection", {
        commit_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'commits',
                key: 'id'
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'users',
                key: 'email'
            }
        },
        choosed: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {timestamps: true}, )
    return Selection
 }