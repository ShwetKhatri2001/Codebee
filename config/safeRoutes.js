const ActiveSession = require('../models/activeSession');

const reqAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const user = await ActiveSession.findOne({
      token: String(token),
    });

    if (!user) {
      return res.json({ success: false, msg: 'User is not logged in' });
    }
    req.user = user;
    req.token = token;
    return next();

  } catch (err) { res.status(401).send({ error: err }); }
};

module.exports = {
  reqAuth: reqAuth,
}