const { User } = require("../models/user")
const cryptojs = require('crypto-js')

const register = async (req, res) => {
    const { name, email, password } = req.body
    let user = await User.findOne({ email })
    if (user) {
        return res.send({ message: "email existe" })
    }
    else {
        const user = new User({
            name,
            email: cryptojs.HmacSHA256(email, process.env.EMAIL_KEY).toString(),
            password
        });
        user.save()
            .then(() => res.status(200).json({ message: "user " + user + " added successfully!" }))
            .catch(error => res.status(400).json({ error }))
    }
}
const login = (req, res) => {
    const { email, password } = req.body
    const encryptedEmail = cryptojs.HmacSHA256(email, process.env.EMAIL_KEY).toString()

    User.findOne({ email: encryptedEmail })
        .then(user => {
            user.comparePassword(password, (err, isMatch) => {
                if (!isMatch)
                    return res.json({ loginSuccess: false, message: "Wrong password" })

                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err)
                    res.cookie("w_authExp", user.tokenExp)
                    res.cookie("w_auth", user.token).status(200).json({
                        loginSuccess: true, userId: user._id
                    })
                })
            })
        }).catch(err => {
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found" + err
            })
        })
}
module.exports = { register, login }

