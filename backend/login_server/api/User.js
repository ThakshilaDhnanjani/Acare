const express = require('express');
const router = express.Router();

//mongodb user connection
const User = require('../models/User');

//import driver model
const Driver = require('../models/Driver');

//password handler
const bcrypt = require('bcryptjs');



//Signup Route
router.post('/signup', (req, res) => {
    console.log(req.body); // Log the request body
    let {userid,name, email, password} = req.body;

    id = userid.trim();
    name = name.trim();
    email = email.trim();
    password = password.trim();


    if(name == '' || email == '' || password == '' || userid == '') {
        res.json({
            status: 'FAILED',
            message: 'Empty input fields!'
        });
    }else if (!/^[a-zA-Z]*$/.test(name)) {
        res.json({
            status: 'FAILED',
            message: 'Invalid name enterd!'
        });
    }else if (!/^[\w-\.\+]*@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: 'FAILED',
            message: 'Invalid email enterd!'
        });

    }else  if (password.length < 8) {
        res.json({
            status: 'FAILED',
            message: 'Password is too short!'
        });
    } else {

        // Check if userid exists in the drivers collection
    Driver.find({ userid }).then(driverResult => {
        if (driverResult.length === 0) {
            res.json({
                status: 'FAILED',
                message: 'UserID not found in drivers collection!'
            });
        
        //end
        }else{


        //check if user already exists
        User.find({userid}).then(result=>{
                if(result.length){
                    //a user already exists
                    res.json({
                        status: 'FAILED',
                        message: 'User already exists!'
                    });
                }else {
                    //Try to create new user

                    //password handling
                    const saltRounds = 10;
                    bcrypt.hash(password, saltRounds).then(hashedPassword=>{
                        const newUser = new User({
                            userid,
                            name,
                            email,
                            password: hashedPassword
                        });
                    

                        newUser.save().then(result=>{
                            res.json({
                                status: 'SUCCESS',
                                message: 'Signup successfully!',
                                data: result
                            });
                            
                        }).catch(err=>{
                            res.json({
                                status: 'FAILED',
                                message: 'An error occurred while saving User Account!'
                            });
                        });
                    })
                        .catch(err=>{
                            console.log(err);
                            res.json({
                                status: 'FAILED',
                                message: 'An error occurred while hashing password!'
                            });
                    })
                }
        }).catch(err=>{
            console.log(err);
            res.json({
                status: 'FAILED',
                message: 'An error occurred while checking for existing user!'
            });
        })
    }

    });
}
});


//Signin Route
router.post('/signin', (req, res) => {
    let {userid, password} = req.body;
    userid = userid.trim();
    password = password.trim();

    if(userid == '' || password == '') {
        res.json({
            status: 'FAILED',
            message: 'Empty input fields!'
        });
    }else{
        //check if user exists
        User.find({userid})
        .then(data=>{
            if(data.length){

                //user exists
                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result=>{
                    if(result){
                        //password match
                        res.json({
                            status: 'SUCCESS',
                            message: 'Signin successful!',
                            data: data
                        });
                    }else {
                        res.json({
                            status: 'FAILED',
                            message: 'Invalid password entered!'
                        });
                    }
                })
                .catch(err=>{
                    res.json({
                        status: 'FAILED',
                        message: 'An error occurred while comparing passwords!'
                    });
                });
            }else {
                res.json({
                    status: 'FAILED',
                    message: 'User not found!'
                });
            }
        })
        .catch(err=>{
            res.json({
                status: 'FAILED',
                message: 'An error occurred while checking for existing user!'
            });
        });
    }
});

module.exports = router;