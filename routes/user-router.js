const express = require('express')

const   router = express.Router()

const  userRouter  = require('../controllers/user-controller'); 

router.get('/', userRouter.getAllUsers) //get all users

router.post('/login',userRouter.login) //user login

router.post('/signup',userRouter.signUpUser) //signup and login

router.patch('/updatePassword/:id',userRouter.updateUserPassword) // update password for the user

router.delete('/:id',userRouter.deleteUser) //delete user based on user id

module.exports = router;