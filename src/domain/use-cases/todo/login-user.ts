import { loginUser } from "../../dtos/todos";
import { registerUser } from "../../dtos/todos/entities/user.entity";
import { UserRepository } from "../../repositories/user-repository";

export interface LogUserInterface {
  execute(dtos: loginUser): Promise<registerUser>;
}

export class Loginauser implements LogUserInterface {
  constructor(private readonly repository: UserRepository) {}

  execute(dtos: loginUser): Promise<registerUser> {
    return this.repository.loginAUser(dtos);
  }
}
