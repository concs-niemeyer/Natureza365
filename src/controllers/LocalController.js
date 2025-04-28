const { default: axios } = require("axios");
const Local = require("../models/Local");
const { getUserId } = require("../middleware/getUserId");
const Description = require("../models/LocalDescription");

class LocalController {
  // Método para listar todos os Locais da Natureza do Usuário [OK]
  async listar(req, res) {
    getUserId(req, res, async () => {
      // console.log(idUser,":::ID_USUARIO:::")
      try {
        const locais = await Local.findAll({ where:{userId : idUser }});
        const descriptionLocal = await Description.findOne({ where: {userId: idUser}})
        
        res.json({locais}, {descriptionLocal});
      } catch (error) {
        console.error("Erro ao localizar Locais da Natureza:", error);
        res
          .status(500)
          .json({ error: "Erro ao localizar Locais da Natureza." });
      }
    });
  }

  // Método para cadastrar um Local da Natureza
  async cadastrar(req, res) {
    getUserId(req, res, async () => {
      const userId = idUser;
      const { name, address, cep, numero, descFlora, descFauna } = req.body;

      try {
        const novoLocal = await Local.create({
          name,
          address,
          cep,
          numero,
          userId,
        });

        const novaDescription = await Description.create({
          userId,
          localId: novoLocal.id,
          dataVisita: new Date(),
          descFauna,
          descFlora,
        });

        res
          .status(201)
          .json({ local: novoLocal, description: novaDescription });
      } catch (error) {
        console.error("Erro ao cadastrar o local:", error);
        res.status(500).json({ error: "Erro ao cadastrar o local." });
      }
    });
  }

  // Método para mapear um local da Natureza
  async mapear(req, res) {
    getUserId(req, res, async () => {
      const localId = req.params.localId;

      try {
        const local = await Local.findOne({
          where: { id: localId, idUser },
        });

        if (!local) {
          return res.status(404).json({ error: "Local não encontrado." });
        }

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
            .json({ error: "Não foi possível encontrar o local no mapa." });
        }
      } catch (error) {
        console.error("Erro ao mapear o local:", error);
        res.status(500).json({ error: "Erro ao mapear o local." });
      }
    });
  }

  // Método para atualizar um Local da Natureza
  async atualizar(req, res) {
    getUserId(req, res, async () => {
      const { localId } = req.params;
      const { name, address } = req.body;

      try {
        const [localAtualizado] = await Local.update(
          { name, address },
          {
            where: { id: localId, idUser },
          }
        );

        if (!localAtualizado) {
          return res
            .status(404)
            .json({
              error: "Local não encontrado ou não pertence ao usuário.",
            });
        }

        res.status(200).json({ message: "Local atualizado com sucesso!" });
      } catch (error) {
        console.error("Erro ao atualizar o local:", error);
        res.status(500).json({ error: "Erro ao atualizar o local." });
      }
    });
  }

  // Método para deletar um Local da Natureza
  async deletar(req, res) {
    getUserId(req, res, async () => {
     
      const { localId } = req.params;

      try {
        const localExistente = await Local.findOne({
          where: { id: localId, idUser },
        });

        if (!localExistente) {
          return res
            .status(404)
            .json({ error: "O local não existe ou não pertence ao usuário." });
        }

        await Local.destroy({ where: { id: localId } });
        res.status(204).end();
      } catch (error) {
        console.error("Erro ao deletar o local:", error);
        res.status(500).json({ error: "Erro ao deletar o local." });
      }
    });
  }
}

module.exports = new LocalController();
