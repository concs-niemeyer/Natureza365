const Usuario = require("../models/Usuario");
// mudar o nome para validarUsusário
const validate = (schema) => async (req, res, next) => {

	if (!req.body.nome || !req.body.email) { return res.status(400).json({error: "O nome e email são obrigatórios"})
	}
	
	if (!req.body.data_nascimento) {
		return res.status(400).json({error: "Insira a data de nascimento no formato YYYY-MM-DD"})
	}
	if (!req.body.cpf || req.body.cpf.length !== 11) {

		return res.status(400).json({ error: "O CPF precisa ser um número com 11 dígitos (string)." });
	}
	
	if (!req.body.sexo ) { return res.status(400).json({error: "No item sexo escolha entra as opções: feminino, masculino ou outros."})}



	try {
		// Verificar se o CPF já existe na tabela Usuarios
		const usuario = await Usuario.findOne({ where: { cpf: req.body.cpf } });
	
		if (usuario) {
			return res.status(409).json({ error: "CPF já cadastrado." });
		}

	} catch (error) {
		console.error("Erro ao buscar CPF na tabela Usuarios:", error);
		return res.status(500).json({ error: "Erro interno do servidor" });
	}


	function validarEmail(email) {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	}
	
	if (!validarEmail(req.body.email)) {
		return res.status(400).json({ error: "Insira um email válido" });
	}
	

	try {
		await schema.validate( { body } = req.body	)
				
		return next()

	} catch (error) {
		//console.error(error, error)
		return res.status(400).json({error})
	}
}


module.exports = validate