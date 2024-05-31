import { prisma } from "../../data/postgres/index";
import { Request, Response } from "express";
import { CreateUserDto, UpdateUser, updatePass } from "../../domain/dtos/todos";
import { UserRepository } from "../../domain";

export class Controller {
  constructor(private readonly userRepository: UserRepository) {}

  public getUserById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    try {
      const userId = await this.userRepository.findById(id);
      res.json(userId);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  public createUser = async (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const creUser = await this.userRepository.create(createUserDto!);
    res.json(creUser);
  };

  public updateUser = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateUser] = UpdateUser.create({
      ...req.body,
      id,
    });
    if (error) return res.status(400).json({ error });

    const upUser = await this.userRepository.updateById(updateUser!);
    return res.json(upUser);
  };

  public updatePassword = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, UpdatePass] = updatePass.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    const upPass = await this.userRepository.updateById(UpdatePass!);
    return res.json(upPass);
  };
}
