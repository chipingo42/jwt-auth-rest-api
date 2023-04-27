const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const User = require('../models/UserController');
const { authSchemaValidation } = require('../models/validation_schema');
const { signAccessToken } = require('../models/jwt_access')


router.post('/register', async (req, res, next) => {
  try {
    const result = await authSchemaValidation.validateAsync(req.body);
    
    const doesExit = await User.findOne({ email: result.email });
    
    if (doesExit) throw createError.Conflict(`${result.email} is already registerd`);
    
    let newUser = new User(result);
    
    let saveNewUser =  await newUser.save();

    const accessToken = await signAccessToken(saveNewUser.id)
    
    res.send({ accessToken });
     
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error)
  }
})


router.post('/login', async (req, res, next) => {
  try {
    const result = await authSchemaValidation.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });

    if (!user) throw createError.NotFound("User not registered")

    const isMatchPass = await user.isValidPassword(result.password) // this User now has access to isValidPassword func    
    if (!isMatchPass) throw createError.Unauthorized("Username/Password not valid") 

    const accessToken = await signAccessToken(user.id)


    res.send({accessToken})
  } catch (error) {
    if (error.isJoi === true) return next(createError.BadRequest("Invalid Username/Password "))
    next(error)
  }
}) 






router.post('/refresh_token', (req, res, next) => {
  res.send("refresh token router")
})

router.delete('/logout', (req, res, next) => {
  res.send("logout router is runing")
})


module.exports = router;