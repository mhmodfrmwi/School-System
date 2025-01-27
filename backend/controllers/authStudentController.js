const expressAsyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const Student =require("../DB/student")

const signToken = id => {
    return jwt.sign({ id }, process.env.SECRET_STR, {
      expiresIn: process.env.LOGIN_EXPIRES
    });
};

const login = expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
        return res.status(400).json({
            status: 400,
            message: "Please provide email and password!",
          });
    }
    // Check if user exists && password is correct
    const student = await Student.findOne({ email }).select('+password');
  
    if (!student || !(await student.comparePasswordInDb(password, student.password))) {
        return res.status(401).json({
            status: 401,
            message: "Incorrect email or password",
          });
    }
  
    // If everything ok, send token to client
    const token = signToken(student._id);

    res.status(200).json({
        status:200,
        token,
        message: "Login successful",
        student
    })

  });


 module.exports = {
    login,
  };
 