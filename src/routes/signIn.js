const { User } = require('../db/sequelize')
const { UniqueConstraintError } = require('sequelize')
module.exports=(app)=>{
    app.post('/api/signin', (req,res)=>{
        require('bcrypt').hash(req.body.password, 10)
        .then(hash=>{
            User.create({
                username: req.body.username,
                password: hash
            })
            .then(user =>{
                res.json({ message: `your account have been created successfully, go to the login page`, data: user })
            })
            .catch(error => {
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                res.status(500).json({ message: "this page couldn't load, please try later", data: error })
            })
        })
                
    })
}