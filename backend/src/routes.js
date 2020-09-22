import { Router } from "express";

const routes = new Router();

//  Rota de Teste
routes.get("/", (request, response) => {
  response.json({ msg: "Hello Word" });
});

export default routes;
