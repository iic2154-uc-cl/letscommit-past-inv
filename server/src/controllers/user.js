//importing modules
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

// Assigning users to the variable User
const User = db.users;
const Commit = db.commits;
const Assignment = db.assignments;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
  try {
      const { email, password } = req.body;
      const data = {
        email,
        password: await bcrypt.hash(password, 10),
      };

      // check email format
      if (!email.includes("@")) {
        return res.status(400).send({
          message: "Invalid email format",
        });
      }
      
      //saving the user
      const user = await User.create(data);

      //if user details is captured
      //generate token with the user's id and the secretKey in the env file
      // set cookie with the token generated
      if (user) {
        let token = jwt.sign({ email }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

        // // get a 3 random id commits from the database
        // const commits = await Commit.findAll({
        //   order: db.sequelize.random(),
        //   limit: 3,
        // });

        // // assign to user the 3 commits
        // for (const commit of commits) {
        //   await Assignment.create({
        //     assigned_user_email: user.email,
        //     commit_id: commit.id,
        //     survey_ans: false,
        //   });
        // }
        
        //send users details
        return res.status(201).send({
            message: "User created successfully",
            user: user.email,
            token: token,
          });
          
      } else {
        return res.status(500).send({
          message: "An error occured",
        });
      } 
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "An error occured",
    });
  }
};


//login authentication

const login = async (req, res) => {
 try {
    const { email, password } = req.body;

    //find a user by their email
    const user = await User.findOne({
      where: {
      email: email
    } 
    });

   //if user email is found, compare password with bcrypt
   if (user) {
     const isSame = await bcrypt.compare(password, user.password);

     //if password is the same
      //generate token with the user's id and the secretKey in the env file

     if (isSame) {
       let token = jwt.sign({ email }, process.env.secretKey, {
         expiresIn: 1 * 24 * 60 * 60 * 1000,
       });

       //if password matches wit the one in the database
       //go ahead and generate a cookie for the user
       res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
       //send user data
        return res.status(200).send({
          message: "User log in successfully",
          user: user.email,
          token: token,
        });
     } else {
       return res.status(401).send({
        message: "Authentication failed",
     });
     }
   } else {
     return res.status(401).send({
      message: "Authentication failed",
   });
   }
 } catch (error) {
   console.log(error);
 }
};

const logout = async (req, res) => {
  try {
    //clear cookie
    res.clearCookie("jwt");
    return res.status(200).send({
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: "An error occured",
    });
  }
};

const update = async (req, res) => {
  // we will update the user's password
  try {
    const { email } = req.user;
    const { password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (user) {
      const updated = await user.update({ password: await bcrypt.hash(password, 10) });
      if (updated) {
        return res.status(200).send({
          message: "Password updated successfully",
        });
      } else {
        return res.status(500).send({
          message: "An error occured",
        });
      }
    } else {
      return res.status(404).send({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "An error occured",
    });
  }
};


module.exports = {
  signup,
  login,
  logout,
  update,
};