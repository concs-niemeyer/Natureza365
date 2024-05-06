//const { where } = require("sequelize");
const { default: axios } = require("axios");
const Descricao = require("../models/Descricao");
const Local = require("../models/Local");
const { verify } = require("jsonwebtoken");

class LocalController {
  // Método para listar todos os Locais da Naturea [ ok ]
  async listar(req, res) {
    try {
      const local = await Local.findAll();
      res.json(local);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter usuarios." });
    }
  }

  // Método para cadastrar um Local da Natureza [ ok ]
  async cadastrar(req, res) {
    const localNome = req.body.nome;
    const localEndereco = req.body.local_endereco; // Não funfa direito com o CEP, mas com outros dados Rua, Bairro, Cidade, Estado tá ok.

    // Obter o ID do usuário do token JWT
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Token JWT não fornecido" });
    }

    let usuarioId;
    try {
      const decodedToken = verify(token, process.env.SECRET_JWT);
      usuarioId = decodedToken.sub;

    } catch (error) {
      console.error("Erro ao verificar o token JWT:", error);
      return res.status(401).json({ error: "Token JWT inválido" });
    }

    try {
      const local = await Local.create({
        nome: localNome,
        local_endereco: localEndereco,
        usuarioId: usuarioId, // atribuindo o ID do usuário
      });

      res.status(201).json(local);
    } catch (error) {
      console.error("Erro ao cadastrar o local:", error);
      res
        .status(500)
        .json({ error: "Erro ao cadastrar a descrição do local da natureza" });
    }
  }

  // Método para mapear um local informado
  async mapear(req, res) {
    try {
      const { local_id } = req.params;
      const local = await Local.findByPk(local_id);

      if (!local) {
        return res.status(404).json({ error: "Local não encontrado" });
      }

      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ error: "Token JWT não fornecido" });
      }

      let usuarioId;

      try {
        const decodedToken = verify(token, process.env.SECRET_JWT);
        usuarioId = decodedToken.sub;
      } catch (error) {
        console.error("Erro ao verificar o token JWT:", error);
        return res.status(401).json({ error: "Token JWT inválido" });
      }

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(
            local.local_endereco
          )}&format=json`
        );

        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
          return res.status(201).json({ googleMapsLink, lat, lon });
        } else {
          return res.status(404).json({ error: "Local não encontrado" });
        }
      } catch (error) {
        console.error("Erro ao mapear o local:", error);
        return res.status(500).json({ error: "Erro ao mapear o local" });
      }
    } catch (error) {
      console.error("Erro ao encontrar o local:", error);
      return res.status(500).json({ error: "Erro ao encontrar o local" });
    }
  }

  // Falta testar !!!
  async listarUm(req, res) {
    try {
      const { id } = req.params;
      const local = await Local.findByPk(id);

      res.json(local);
    } catch (error) {
      res.status(500), json({ error: "Não foi possível realizar a busca" });
    }
  }

  //Método para atualizar um local da Natureza na tabela de Descrições [ok]
  async atualizar(req, res) {
    const { local_id } = req.params;
    const { desc_fauna, desc_flora, data_visita } = req.body;

    // Obter o ID do usuário do token JWT
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Token JWT não fornecido" });
    }

    let usuarioId;
    try {
      const decodedToken = verify(token, process.env.SECRET_JWT);
      usuarioId = decodedToken.sub;
    } catch (error) {
      console.error("Erro ao verificar o token JWT:", error);
      return res.status(401).json({ error: "Token JWT inválido" });
    }

    try {
      const descricao = await Descricao.create({
        local_id: local_id,
        desc_fauna: desc_fauna,
        desc_flora: desc_flora,
        data_visita: data_visita,
        usuarioId: usuarioId, // atribuindo o ID do usuário
      });

      const descricaoAtualizada = await descricao.save();
      res.status(200).json(descricaoAtualizada);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao atualizar a descrição do local." });
    }
  }

  // Método para Apagar um local da Natureza [ok]
  async deletar(req, res) {
    const { local_id } = req.params;

    try {
      const localExistente = await Local.findByPk(local_id);

      if (!localExistente) {
        return res.status(404).json({ error: "O local não existe." });
      }

      await Local.destroy({ where: { id: local_id } });
      res.status(204).end();
    } catch (error) {
      console.error(error, error);
      res.status(500).json({ error: "Erro ao deletar o local." });
    }
  }
}

module.exports = new LocalController();
