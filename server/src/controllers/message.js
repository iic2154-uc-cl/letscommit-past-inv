const db = require("../models");

const Message = db.messages;
const Commit = db.commits;

const promptv = "V2.0.0";

const postMessage = async (req, res) => {
    try {
        const { sha, message: msg, giver } = req.body;

        const commit = await Commit.findOne({ where: { sha } });
        if (!!commit) {
            const me = await Message.create({ commit_id: commit.id, message: msg, promptv, giver });
            if (me) {
                return res.status(201).send({
                    message: "Message created successfully"
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

const postMessageList = async (req, res) => {
    try {
        const { sha, messages } = req.body;
        const commit = await Commit.findOne({ where: { sha } });
        if (!!commit) {
            const me = await Message.bulkCreate(messages.map((message) => ({ commit_id: commit.id, message: message.message, promptv: promptv, giver: message.giver })));
            if (me) {
                return res.status(201).send({
                    message: "Message created successfully"
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

module.exports = { postMessage, postMessageList };