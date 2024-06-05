import { Router } from "express";
import { Controller } from "./controller";
import { TodoDatasourceImplementation } from "../../infraestructure/datasource/todo.datasourceImplemen";
import { TodoRepositoryImpl } from "../../infraestructure/datasource/repositories/todo.repositories";
import { EmailService } from "../../infraestructure/email.service";
import { envs } from "../../config";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY
    );
    const datasource = new TodoDatasourceImplementation(emailService);
    const todoRepository = new TodoRepositoryImpl(datasource);
    const ControllerUser = new Controller(todoRepository);

    router.get("/:id", ControllerUser.getUserById);
    router.post("/", ControllerUser.createUser);
    router.put("/:id", ControllerUser.updateUser);
    router.put("/:id/upPass", ControllerUser.updatePassword);
    router.put("/usuario/login", ControllerUser.login);
    router.put("/api/user/validate/:token", ControllerUser.ValidateEmailLin);

    return router;
  }
}
