const db = require("../models");
var parse = require('parse-diff');
const { getBots } = require("../bots/worker");
const {Sequelize} = require('sequelize')

const Assignment = db.assignments;
const Commit = db.commits;
const Message = db.messages;

// format:
// "user_email":"arios6@uc.cl",
//     "commits":["d267ea0f1895072ccebd00f0dc3f128cb4123158"]
const postAssignments = async (req, res) => {
    const { user_email, commits } = req.body;
    
    const assignment_errors = [];

    try {
        
        for (const sha of commits) {
            const commit = await Commit.findOne({ where: { sha } });
            if (!!commit) {
                const assignment = await Assignment.create({ assigned_user_email: user_email, commit_id: commit.id, survey_ans: false });
                if (!assignment) {
                    assignment_errors.push(sha);
                }
            }
        }

        const to_assign = commits.length;
        const total_assigned = to_assign - assignment_errors.length;

        const response = {
            to_assign: to_assign,
            total_assigned: total_assigned,
            assignment_errors: assignment_errors,
        };

        return res.status(201).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const file_chunks_to_string = (file_chunks) => {
    let file_string = '';

    for (const chunk of file_chunks) {
        file_string += chunk.content + '\n';
        for (const change of chunk.changes) {
            file_string += change.content + '\n';
        }
    }
                
    return file_string;
}

const parse_code_diff = (diff) => {
    // return format:
    // [{fileName, filediff}, {fileName, filediff}, ...]
    const parsed = parse(diff);
    const files = [];
    for (const file of parsed) {
        const fileName = 'a/'+file.from + ' -> b/'+file.to;
        const fileDiff = file_chunks_to_string(file.chunks);
        files.push({ fileName, fileDiff });
    }
    return files;
}


const getToDoAssignment = async (req, res) => {
    const { email } = req.user;

    try {
        // const assignments = await Assignment.findAll({ where: { assigned_user_email: email, survey_ans: false } });
        // first on list, get also commit and message
        const assignment = await Assignment.findOne({ 
            where: { assigned_user_email: email, survey_ans: false },
            order: [
                Sequelize.fn( 'RANDOM' ),
              ],
        });
        if (!!assignment) {
            const commit = await Commit.findOne({ where: { id: assignment.commit_id } });
            if (!!commit) {
                //givers = gpt3, gpt4, llama, author
                const messageList = await Message.findAll({ where: { commit_id: commit.id} });
                const bots = await getBots(messageList);

                // process messages
                const messages = [];
                for (const message of messageList) {
                    const bot = bots.find((bot) => bot.sign === message.giver);
                    // we also have a message.giver that is not in bot list
                    if (!!bot) {
                        messages.push({ message: message.message, name: bot.name, sign: bot.sign });
                    } else {
                        messages.push({ message: message.message, name: message.giver, sign: message.giver });
                    }
                }

                // process diff
                const diff = parse_code_diff(commit.diff);

                const response = {
                    id: commit.id,
                    sha: commit.sha,
                    repo: commit.repo,
                    diff,
                    assignment_id: assignment.id,
                    messages,
                };
                return res.status(200).json(response);
            } else {
                return res.status(404).json({ message: "No commit found" });
            }
        } else {
            return res.status(204).json({ message: "No assignment found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { postAssignments, getToDoAssignment };
