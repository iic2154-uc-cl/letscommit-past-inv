const db = require("../models");

const Survey = db.surveys;
const Question = db.questions;
const Assignment = db.assignments;

const postSurvey = async (req, res) => {
    const { sha, repository, answers, assignment_id } = req.body;
    const { email } = req.user;

    try {
        const survey = await Survey.create({ email, repo: repository, commit_sha: sha});
        if (survey) {
            for (const ans of answers) {
                const question = await Question.create({ question_number: ans.question_number, answer: ans.answer, survey_id: survey.id });
            }
            const assignment = await Assignment.findOne({ where: { id: assignment_id } });
            
            if (!!assignment) {
                // update assignment to completed
                assignment.survey_ans = true;
                await assignment.save();
                
            }
            return res.status(201).send({
                message: "Survey created successfully"
            });
        } else {
            return res.status(500).send({
                message: "Something went wrong"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Something went wrong"
        });
    }
}

module.exports = { postSurvey };