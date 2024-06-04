import { prisma } from "../../data/postgres/index";
import { Request, Response } from "express";
import {
  CreateUserDto,
  UpdateUser,
  loginUser,
  updatePass,
} from "../../domain/dtos/todos";
import {
  UserRepository,
  createTod,
  createTodo,
  createTodos,
  createuser,
} from "../../domain";
import { Loginauser } from "../../domain/use-cases/login-user";

export class Controller {
  constructor(private readonly userRepository: UserRepository) {}

  public getUserById = (req: Request, res: Response) => {
    const id = +req.params.id;

    new createTodos(this.userRepository)
      .execute(id)
      .then((gid) => res.json(gid))
      .catch((error) => res.status(400).json({ error }));
  };

  public createUser = (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new createTodo(this.userRepository)
      .execute(createUserDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public updateUser = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateUser] = UpdateUser.create({
      ...req.body,
      id,
    });
    if (error) return res.status(400).json({ error });

    new createuser(this.userRepository)
      .execute(updateUser!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public updatePassword = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, UpdatePass] = updatePass.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    new createTod(this.userRepository)
      .execute(UpdatePass!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public login = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, Loginuser] = loginUser.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    new Loginauser(this.userRepository)
      .execute(Loginuser!)
      .then((user) => res.json(user))
      .catch((error) => res.status(400).json({ error }));

    // const { email } = req.body;
    // const findEmail = await prisma.usuario.findFirst({
    //   where: { email },
    // });

    // findEmail ? res.json(findEmail) : res.json("error");
  };
}
