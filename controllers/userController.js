const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ActiveSession = require('../models/activeSession');
const sendEmail = require('../utils/sendEmail')
const crypto = require("crypto");
const FormData = require("form-data");

exports.getProfile = async (req, res, next) => {
    try {
        const { user } = req;
        const userProfile = User.findOne({ _id: user.userId })
        res.json({
            success: true,
            user
        })
    } catch (err) {
        throw err;
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.json({ success: false, msg: 'User not registered' });
        }

        if (!user.verified) {
            if (!user.password) return res.json({ success: false, msg: 'User not registered' });
            return res.json({ success: false, msg: 'Account is not confirmed' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
                const token = jwt.sign(user, process.env.JWT_SECRET, {
                    expiresIn: 86400, 
                });

                const query = { userId: user._id, token: 'JWT ' + token };
                ActiveSession.create(query, (err, cd) => {
                    user.password = null;
                    user.__v = null;
                    return res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user,
                    });
                });
            } else {
                return res.json({ success: false, msg: 'Wrong credentials' });
            }
        });
    } catch (err) {
        throw err
    }
}

exports.googleLogin = async (req, res) => {
    const data = req.body;

    const profile = data.profileObj;
    try {
        let user = await User.findOne({ email: profile.email }).catch(e => console.log(e));

        if (!user) {
            user = await googleRegister(profile);
        }
        const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: 86400, 
        });

        const query = { userId: user._id, token: 'JWT ' + token };
        ActiveSession.create(query, (err, cd) => {
            user.password = null;
            user.__v = null;
            return res.json({
                success: true,
                token: 'JWT ' + token,
                user
            });
        });
    } catch (err) {
        throw err
    }
}

exports.githubLogin = async (req, res) => {
    const { code } = req.body;
    const data = new FormData();
    data.append("client_id", process.env.CLIENT_ID);
    data.append("client_secret", process.env.CLIENT_SECRET);
    data.append("code", code);
    data.append("redirect_uri", `${process.env.DOMAIN_NAME}/auth/login`);

    fetch(`https://github.com/login/oauth/access_token`, {
        method: "POST",
        body: data,
    })
        .then((response) => response.text())
        .then((paramsString) => {
            let params = new URLSearchParams(paramsString);
            const access_token = params.get("access_token");
            console.log("Access_token: ", access_token);
            if (!access_token) return res.json({ success: false, msg: 'User Not Found' });
            fetch(`https://api.github.com/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
                .then((response) => { console.log(response.status); return response.json(); })
                .then(async (response) => {
                    const email = response[0].email, username = response[1].email.split('@')[0].split('+')[1];
                    console.log(email, username);

                    try {
                        let user = await User.findOne({ email: email }).catch(e => console.log(e));
                        console.log(user);
                        if (!user) {
                            user = await githubRegister(email, username);
                        }

                        const token = jwt.sign(user, process.env.JWT_SECRET, {
                            expiresIn: 86400, 
                        });

                        const query = { userId: user._id, token: 'JWT ' + token };
                        ActiveSession.create(query, (err, cd) => {
                            user.password = null;
                            user.__v = null;
                            return res.json({
                                success: true,
                                token: 'JWT ' + token,
                                user
                            });
                        });
                    } catch (err) {
                        throw err
                    }
                })
                .catch((error) => {
                    console.log(error);
                    return res.json({ success: false, msg: 'User Not Found' });
                });

        })
        .catch((error) => {
            console.log(error);
            return res.json({ success: false, msg: 'User Not Found' });
        });
}

async function googleRegister(profile) {
    const { name, email, imageUrl } = profile;
    const query = {
        name: name,
        email: email,
        photo: imageUrl
    };
    return await User.create(query).catch(e => console.log(e));
}

async function githubRegister(email, name) {
    const query = {
        name: name,
        email: email,
    };
    return await User.create(query).catch(e => console.log(e));
}

exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ email: email })
        if (user && user.password) {
            res.json({ success: false, msg: 'Email already exists' });
        } else if (password.length < 6) {
            res.json({ success: false, msg: 'Password must be at least 6 characters long' });
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, null, (err, hash) => {
                    if (err) throw err;
                    const query = {
                        name: name, email: email,
                        password: hash
                    };
                    User.create(query, async (err, user) => {
                        if (err) throw err;

                        await sendEmail({
                            email: email,
                            subject: "Confirm your account",
                            html: '<h1>Hey,</h1><br><p>Confirm your new account </p><p><a href="' + `http://localhost:${process.env.PORT}/api/users/confirm/` + user._id + '">"' + 'verify!' + '"</a></p>'
                        })

                        res.json({ success: true, msg: 'The user was succesfully registered' });
                        
                    });
                });
            });
        }

    } catch (err) {
        throw err
    }
}


exports.logout = async (req, res, next) => {
    try {
        const { token } = req;
        await ActiveSession.deleteMany({ token: token })
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false });
    }

}

exports.confirmMail = async (req, res, next) => {
    try {
        const userId = req.params.id
        const user = await User.findOne({ _id: userId })
        if (!user) return res.json({ success: true });
        const query = { _id: userId };

        const newvalues = { $set: { verified: true } };
        await User.updateOne(query, newvalues)
        res.send(`<p> Your email-id has been verified, You will be redirected to login page or <a href='${process.env.DOMAIN_NAME}/auth/login'> click here to login</a> </p> <script>setTimeout(function(){ window.location = '${process.env.DOMAIN_NAME}/auth/login' },3000)</script>`);
    } catch (err) {
        throw err
    }
}

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({
        email: email,
    });
    if (!user) return res.json({ success: false, msg: "Email not registered!" })
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const html = `<p>Forgot your password? <br> Paste this Code on your screen and enter your New Password.<br>  If you didn't forget your password, please ignore this email!<br>   ${resetToken} <br> </p> `;

    try {
        await sendEmail({
            email: user.email,
            subject: "Your Password Reset Token {Valid for 10 min}",
            html: html,
        });

        res.json({
            success: true,
            msg: "Token sent to mail",
        });
    } catch (err) {
        user.resetPassToken = undefined;
        user.resetPassTokenExpires = undefined;
        await user.save({ validateBeforeSave: false });

        throw err;
    }
}

exports.resetPassword = async (req, res, next) => {
    try {
        const resetToken = crypto
            .createHash("sha256")
            .update(req.body.token)
            .digest("hex");

        const user = await User.findOne({
            resetPassToken: resetToken,
            resetPassTokenExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.json({ success: false, msg: "Invalid user" });
        }

        user.password = req.body.password;
        user.resetPassToken = undefined;
        user.resetPassTokenExpires = undefined;
        await user.save();
        res.json({ success: true, msg: "Password reset successfully" })
    } catch (err) {
        throw err;
    }
}