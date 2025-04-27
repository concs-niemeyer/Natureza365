const { default: axios } = require("axios");
const Local = require("../models/Local");
const { userId } = require("../middleware/userId");
const Description = require("../models/LocalDescription");

class LocalController {
  // Método para listar todos os Locais da Natureza do Usuário
  async listar(req, res) {
    const { userId } = req.userId;

    try {
      const locais = await Local.findAll({ where: { userId } });
      res.json(locais);
    } catch (error) {
      console.error("Erro ao localizar Locais da Natureza:", error);
      res.status(500).json({ error: "Erro ao localizar Local da Natureza." });
    }
  }

  // Método para cadastrar um Local da Natureza [ ok ]
  async cadastrar(req, res) {
    userId(req, req, async () => {
      const user_Id = req.userId;
      //console.log(user_Id,"<<ID_USUÁRIO>>")
      const { name, address, cep, desc_flora, desc_fauna } = req.body;

      try {
        // Cria o novo local
        const novoLocal = await Local.create({
          name,
          address,
          cep,
          userId: user_Id,
        });
       // console.log(novoLocal, "<<NOVO_LOCAL>>");
        const novaDescription = await Description.create({
          userId: user_Id,
          local_id: novoLocal.id,
          data_visita: new Date(),
          desc_fauna,
          desc_flora,
        });
        //console.log(novaDescription, "<<NOVA_DESCRIÇÃO>>");

        res.status(201).json({ local: novoLocal, description: novaDescription });
      } catch (error) {
        console.error("Erro ao cadastrar o local:", error);
        res.status(500).json({ error: "Erro ao cadastrar o local." });
      }
    });
  }

  // Método para mapear um local do Usuário pelo address [ incompleto ]
  async mapear(req, res) {
    // Chamada do middleware para verificar o token JWT
    userId(req, res, async () => {
      const userId = req.userId;
      const local_id = req.params.local_id;
      //console.log(local_id);
      //console.log(userId);

      try {
        const local = await Local.findOne({
          where: { id: local_id, userId: userId },
        });
        //console.log(local.address) testando o endereço do local
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(
            local.address
          )}&format=json`
        );

        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
          return res.status(200).json({ googleMapsLink, lat, lon });
        } else {
          return res
            .status(404)
            .json({ error: "Não foi possível encontrar o local." });
        }
      } catch (error) {
        console.error("Erro ao obter local:", error);
        res.status(500).json({ error: "Erro ao obter local." });
      }
    });
  }

  // Método para atualizar um local da Natureza.
  async atualizar(req, res) {
    const { userId } = req.body; // Extraindo o userId do corpo da requisição
    const { local_id } = req.params;
    const { name, address, description, lat, lon, CEP } = req.body;

    try {
      // Atualiza o nome e o endereço na tabela de Locais da Natureza
      const [localAtualizado] = await Local.update(
        {
          name,
          address,
        },
        {
          where: {
            id: local_id,
            userId, // Adicionando userId para garantir que o usuário atualize apenas seus locais
          },
        }
      );

      // Verifica se o local foi atualizado
      if (!localAtualizado) {
        return res
          .status(404)
          .json({ error: "Local não encontrado ou não pertence ao usuário." });
      }
    } catch (error) {
      console.error("Erro ao atualizar a descrição do local:", error);
      res
        .status(500)
        .json({ error: "Erro ao atualizar a descrição do local." });
    }
  }

  // Método para Apagar um local da Natureza
  async deletar(req, res) {
    const { userId } = req.body; // Extraindo o userId do corpo da requisição
    const { local_id } = req.params;

    try {
      const localExistente = await Local.findOne({
        where: { id: local_id, userId },
      });

      if (!localExistente) {
        return res
          .status(404)
          .json({ error: "O local não existe ou não pertence ao usuário." });
      }

      await Local.destroy({ where: { id: local_id } });
      res.status(204).end();
    } catch (error) {
      console.error("Erro ao deletar o local:", error);
      res.status(500).json({ error: "Erro ao deletar o local." });
    }
  }
}

module.exports = new LocalController();
