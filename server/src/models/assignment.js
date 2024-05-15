
//user model
module.exports = (sequelize, DataTypes) => {
    const Assignment = sequelize.define( "assignment", {
        //attributes commit_id:int, assigned_user_email:str, survey_ans:bool
        commit_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'commits',
                key: 'id'
            }
        },
        assigned_user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'users',
                key: 'email'
            }
        },
        survey_ans: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }, {timestamps: true}, )
    return Assignment
 }