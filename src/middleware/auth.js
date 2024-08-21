// Verificar a autenticidade do token informado!

const { verify } = require('jsonwebtoken')

async function auth(req, res, next) {
    try {
        console.log("Entramos no Middleware")

        const { authorization } = req.headers

        req['payload'] = verify(authorization, process.env.SECRET_JWT)

        next()

    } catch (error) {
        return res.status(401).json({
            error: "Autenticação Falhou!",
            cause: error.error
        })
    }
}

module.exports = { auth }