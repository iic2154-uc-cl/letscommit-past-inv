const db = require("../models");

const Selection = db.selections;
const Commit = db.commits;
const Assignment = db.assignments;

const postSelection = async (req, res) => {
    const { sha, choice } = req.body;
    const { email } = req.user;
    try {
        const commit = await Commit.findOne({ where: { sha } });
        if (!!commit) {
            const me = await Selection.create({ commit_id: commit.id, email, choosed: choice});
            const assignment = await Assignment.create({ assigned_user_email: email, commit_id: commit.id, survey_ans: false });
            if (me) {
                return res.status(201).send({
                    message: "Selection created successfully"
                });
            } else {
                return res.status(500).send({
                    message: "Something went wrong",
                });
            }
        }
        else {
            return res.status(404).send({
                message: "Commit not found",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Something went wrong",
        });
    }
}

module.exports = { postSelection }