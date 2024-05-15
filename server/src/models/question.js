
//user model
module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define( "question", {
        //attributes: question_number:int, answer:str, survey_id:int
        question_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        survey_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'surveys',
                key: 'id'
            }
        },
    }, {timestamps: true}, )
    return Question
 }