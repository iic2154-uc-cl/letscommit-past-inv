
module.exports = (sequelize, DataTypes) => {
    const Calification = sequelize.define( "calification", {
        commit_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'commits',
                key: 'id'
            }
        },
        who: {
            type: DataTypes.STRING,
            allowNull: false
        },
        calification: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {timestamps: true}, )
    return Calification
 }