const db = require("../models");

const Calification = db.califications;
const Commit = db.commits;


const postCalification = async (req, res) => {
    try {
        const { sha, message: clf, giver } = req.body;

        const commit = await Commit.findOne({ where: { sha } });
        if (!!commit) {
            const me = await Calification.create({ commit_id: commit.id, calification: clf, who: giver });
            if (me) {
                return res.status(201).send({
                    message: "Calification created successfully"
                });
            } else {
                return res.status(500).send({
                    message: "Something went wrong",
                });
            }
        } else {
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

const postCalificationList = async (req, res) => {
    try {
        const { sha, califications } = req.body;
        const commit = await Commit.findOne({ where: { sha } });
        if (!!commit) {
            const me = await Calification.bulkCreate(califications.map((clf) => ({ commit_id: commit.id, calification: clf.message, who: clf.giver })));
            if (me) {
                return res.status(201).send({
                    message: "Calification created successfully"
                });
            } else {
                return res.status(500).send({
                    message: "Something went wrong",
                });
            }
        } else {
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

module.exports = { postCalification, postCalificationList };