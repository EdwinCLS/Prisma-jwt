import { Router } from "express";
import { Controller } from "./controller";
import { TodoDatasourceImplementation } from "../../infraestructure/datasource/todo.datasourceImplemen";
import { TodoRepositoryImpl } from "../../infraestructure/datasource/repositories/todo.repositories";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new TodoDatasourceImplementation();
    const todoRepository = new TodoRepositoryImpl(datasource);
    const ControllerUser = new Controller(todoRepository);

    router.get("/:id", ControllerUser.getUserById);
    router.post("/", ControllerUser.createUser);
    router.put("/:id", ControllerUser.updateUser);
    router.put("/:id/upPass", ControllerUser.updatePassword);
    router.put("/usuario/login", ControllerUser.login);

    return router;
  }
}
