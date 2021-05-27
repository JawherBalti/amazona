const { User } = require("../models/user")
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { name, email, password } = req.body
    let user = await User.findOne({ email })
    if (user) {
        return res.status(500).json({ message: "Email already in use!" })
    }
    else {
        const token = jwt.sign({ name, email, password },
            process.env.JWT_ACCOUNT_ACTIVATION,
            { expiresIn: "100m" })

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.PASSWORD
            }
        })
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Account activation link",
            html: `
                <h1>Please Click the link to activate your account!</h1>
                <a href="http://localhost:3000/activate/${token}">Activate your account</a>
                <hr/>
                <p>This email contains sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
                `
        }
        transporter.sendMail(emailData)
            .then(sent => res.status(200).json({ message: `Account activation link was sent to ${email}` }))
            .catch(err => res.status(500).json({ message: "Could not send email verification!" }))
    }
}

const activateAccount = (req, res) => {
    const { token } = req.body;

    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
            if (err) {
                return res.status(498).json({ message: 'Expired link. Please register again!' })
            } else {
                const { name, email, password } = jwt.decode(token)

                User.countDocuments({}, function (err, count) {
                    if (err) {
                        res.status(500).json({ message: "mongoose error!" })
                    } else {
                        if (count === 0) {
                            const user = new User({
                                name,
                                email,
                                password,
                                isAdmin: true
                            })

                            user.save((err, user) => {
                                if (err) {
                                    return res.status(500).json({ message: "Account already activated, you can now signin!" })
                                } else {
                                    return res.status(200).json({ message: 'Account activated! You can now signin!' })
                                }
                            })
                        } else {
                            const user = new User({
                                name,
                                email,
                                password
                            })

                            user.save((err, user) => {
                                if (err) {
                                    return res.status(500).json({ message: "Account already activated, you can now signin!" })
                                } else {
                                    return res.status(200).json({ message: 'Account activated! You can now signin!' })
                                }
                            })
                        }
                    }
                })
            }
        })
    } else {
        return res.status(400).json({ message: "Could not verify account!" })
    }
}

const login = (req, res) => {
    const { email, password } = req.body

    User.findOne({ email: email })
        .then(user => {
            user.comparePassword(password, (err, isMatch) => {
                if (!isMatch) {
                    return res.status(401).json({ message: "Invalid email or password!" })
                }
                user.generateToken((err, token) => {
                    if (err) {
                        return res.status(400).send(err)
                    }
                    res.status(200).json({ user, token })
                })
            })
        }).catch(err => {
            return res.status(401).json({
                message: "Account does not exist!"
            })
        })
}

const getUsers = (req, res) => {
    User.find()
        .then(users => res.send(users))
        .catch(() => res.status(400).send({ message: "Could not get users!" }))
}

const getUser = (req, res) => {
    User.findById(req.params.id)
        .then(user => res.send(user))
        .catch(err => res.status(404).send({ message: "User not found!" }))
}

const updateUser = (req, res) => {
    User.findById(req.user._id)
        .then(user => {
            user.name = req.body.name || user.name //if the name field is empty, use the old username
            if (req.body.password) {
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

const adminUpdateUser = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.name = req.body.name || user.name //if the name field is empty, use the old username
            user.isAdmin = req.body.isAdmin
            user.save()
            user.generateToken((err, token) => {
                if (err) return res.status(400).send(err)
                res.status(200).json({ user, token })
            })
        })
        .catch(err => res.status(404).send({ message: "User not found" }))
}

const adminDeleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => res.send({ message: "User deleted successfully!" }))
        .catch(err => res.status(400).send({ message: "Could not delete user!" }))
}

module.exports = { register, activateAccount, login, getUsers, getUser, updateUser, adminUpdateUser, adminDeleteUser }

