const { User } = require("../models/user")
const cryptojs = require('crypto-js')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    const { name, email, password } = req.body
    let user = await User.findOne({ email })
    if (user) {
        return res.status(400).json({ message: "email existe" })
    }
    else {
        const user = new User({
            name,
            email: cryptojs.HmacSHA256(email, process.env.EMAIL_KEY).toString(),
            password
        });
        user.save()
            .then(() => res.status(200).json({ user }))
            .catch(error => res.status(400).json({ message: "Email already in use!" }))
    }
}

const login = (req, res) => {
    const { email, password } = req.body
    const encryptedEmail = cryptojs.HmacSHA256(email, process.env.EMAIL_KEY).toString()

    User.findOne({ email: encryptedEmail })
        .then(user => {
            user.comparePassword(password, (err, isMatch) => {
                if (!isMatch)
                    return res.status(403).json({ message: "Invalid email or password" })

                user.generateToken((err, token) => {
                    if (err) return res.status(400).send(err)
                    res.status(200).json({
                        user,
                        token
                    })
                })
            })
        }).catch(err => {
            return res.status(404).json({
                message: "Invalid email or password"
            })
        })
}

const getUser = (req, res) => {
    User.findById(req.params.id)
        .then(user => res.send(user))
        .catch(err => res.status(404).send({ message: "User not found!" }))
}

const updateUser = (req, res) => {
    const saltRounds = 10;

    User.findById(req.user._id)
        .then(user => {
            user.name = req.body.name || user.name //if the name field is empty, use the old username
            if (req.body.password) {
                //     bcrypt.genSalt(saltRounds)
                //         .then(salt => {
                //             bcrypt.hash(req.body.password, salt)
                //                 .then(hash => user.password = hash)
                //                 .catch(err => res.status(400).send({ message: "error1" }))
                //         })
                //         .catch(err => res.status(400).send({ message: "error2" }))
                user.password = req.body.password
            }
            user.save()
                .then(user => {
                    user.generateToken((err, token) => {
                        if (err) return res.status(400).send(err)
                        res.status(200).json({ user, token })
                    })
                })
        })
        .catch(err => res.status(404).send({ message: "User not found" }))
}
module.exports = { register, login, getUser, updateUser }

