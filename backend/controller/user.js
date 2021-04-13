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
                    return res.status(403).json({ loginSuccess: false, message: "Invalid email or password" })

                user.generateToken((err, token) => {
                    if (err) return res.status(400).send(err)
                    res.status(200).json({
                        loginSuccess: true,
                        user,
                        token
                    })
                })
            })
        }).catch(err => {
            return res.status(404).json({
                loginSuccess: false,
                message: "Invalid email or password"
            })
        })
}
module.exports = { register, login }

