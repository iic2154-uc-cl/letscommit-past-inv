const db = require("../models");

const Commit = db.commits;

const postCommit = async (req, res) => {
    try {
        const { author, sha, repo, diff } = req.body;
        const data = {
            author,
            sha,
            repo,
            diff,
        };
        const commit = await Commit.create(data);
        if (commit) {
            return res.status(201).send({
                message: "Commit created successfully",
                commit: commit,
            });
        } else {
            return res.status(500).send({
                message: "Something went wrong",
            });
        }
    } catch (error) {
        // console.log(error);
        return res.status(500).send({
            message: "Something went wrong",
        });
    }
};

const postOwnedCommit = async (req, res) => {
    try {
        const { email } = req.user;
        const { sha, repo, diff } = req.body;
        const data = {
            author: email,
            sha,
            repo,
            diff,
        };
        const commit = await Commit.create(data);
        if (commit) {
            return res.status(201).send({
                message: "Commit created successfully",
                commit: commit,
            });
        } else {
            return res.status(500).send({
                message: "Something went wrong",
            });
        }
    } catch (error) {
        // console.log(error);
        return res.status(500).send({
            message: "Something went wrong",
        });
    }
};

const getCommits = async (req, res) => {
    try {
        const commits = await Commit.findAll();
        if (commits) {
            return res.status(200).send({
                message: "Commits retrieved successfully",
                commits: commits,
            });
        } else {
            return res.status(404).send({
                message: "No commits found",
            });
        }
    } catch (error) {
        // console.log(error);
        return res.status(500).send({
            message: "Something went wrong",
        });
    }
}

module.exports = { postCommit, getCommits, postOwnedCommit  };
