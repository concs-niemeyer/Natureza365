

const validarLocal = (schema) => async (req, res, next) => {

    if(!req.body.nome) { return res.status(400).json({error: "Digite o nome do local da natureza."})}

    if (!req.body.local_endereco) { return res.status(400).json({error: "Informe uma localização."})}
    
    try {
        await schema.validate({ body } = req.body )

        return next()
    } catch (error) {

        return res.status(400).json({error})
    }

}


module.exports = validarLocal