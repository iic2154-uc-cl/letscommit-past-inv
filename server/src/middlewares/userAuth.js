//importing modules
const express = require("express");
const db = require("../models");
//Assigning db.users to User variable
const User = db.users;

const saveUser = async (req, res, next) => {
  // Search the database to see if the user exists
  try {
    // Checking if the email already exists
    const emailCheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // If email exists in the database, respond with a status of 409 (Conflict)
    if (emailCheck) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // If the email doesn't exist, continue to the next middleware/route handler
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while checking for existing users",
    });
  }
};

//exporting module
module.exports = {
 saveUser,
};