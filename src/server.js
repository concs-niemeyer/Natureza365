const express = require("express");
const cors = require("cors");
const { connection } = require("./database/connection");
const routes = require("./routes/routes");

const PORT = process.env.PORT || 3000; // Defina a porta, usando PORT da RENDER ou 3000 localmente

class Server {
  constructor(
    server = express()
  ) {
    this.middlewares(server);
    this.database();
    server.use(routes);
    this.initializeServer(server);
  }

  async middlewares(app) {
    const corsOptions = {
      origin: 'https://rota-verde365.onrender.com',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
    };
  
    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions)); // <-- use as MESMAS opções aqui
  
    app.use(express.json());
  }
  
  
  async database() {
    try {
      await connection.authenticate();
      console.log("Conexão bem sucedida!");
    } catch (error) {
      console.error("Não foi possível conectar no banco de dados.", error);
      throw error;
    }
  }

  async initializeServer(app) {
    app.listen(PORT, () => // Altere aqui para usar a variável PORT
      console.log(`Servidor executando na porta ${PORT}`)
    );
  }
}

module.exports = { Server };
