import { updatePass } from "../../dtos/todos";
import { registerUser } from "../../dtos/todos/entities/user.entity";
import { UserRepository } from "../../repositories/user-repository";

export interface GetUserId {
  execute(id: number): Promise<registerUser>;
}

export class createTodos implements GetUserId {
  constructor(private readonly reporsitory: UserRepository) {}

  execute(id: number): Promise<registerUser> {
    return this.reporsitory.findById(id);
  }
}
