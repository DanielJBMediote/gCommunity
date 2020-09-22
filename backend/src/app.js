import express from "express";
import mongoose from "mongoose";
import dataConfig from "../dataConfig";

import routes from "./routes";

class App {
  constructor() {
    this.server = express();

    this.database();
    this.middleware();
    this.routes();
  }

  database() {
    try {
      mongoose.connect(
        `mongodb+srv://${dataConfig.user}:${dataConfig.pass}@${dataConfig.host}/dataMain`,
        {
          useNewUrlParser: true,
          useFindAndModify: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        }
      );
      // console.log("Conectado");
    } catch (error) {
      console.log(error);
    }
  }

  middleware() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
