import { loginUser } from "../dtos/todos";
import { registerUser } from "../dtos/todos/entities/user.entity";
import { validateEmail } from "../dtos/todos/validate-email";
import { UserRepository } from "../repositories/user-repository";

export interface LogUserInterface {
  execute(dtos: validateEmail): Promise<registerUser>;
}

export class ValidateEmailLink implements LogUserInterface {
  constructor(private readonly repository: UserRepository) {}

  execute(dtos: validateEmail): Promise<registerUser> {
    return this.repository.validateEmail(dtos);
  }
}
