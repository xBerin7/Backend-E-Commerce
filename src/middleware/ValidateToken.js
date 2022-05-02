const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) return res.status(401).json({ error: true, message: 'Acceso denegado,introduzca un token correcto' })
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({ error: true, message: 'Token no valido', nativeError: error })
  }
}

module.exports = verifyToken
