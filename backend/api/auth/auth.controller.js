const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const userInfo = req.body
    console.log('req.body is:', req.body);
    try {
        const user = await authService.login(userInfo)
        console.log('user in auth is:', user);
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login - user or pass not ok' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

async function signup(req, res) {
    try {
        const userInfo = req.body
        console.log('req.body is:', req.body);
        // Never log passwords
        // logger.debug(fullname + ', ' + username + ', ' + password)
        const account = await authService.signup(userInfo)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(userInfo)
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function logout(req, res) {
    try {
        req.session.destroy()
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

module.exports = {
    login,
    signup,
    logout
}