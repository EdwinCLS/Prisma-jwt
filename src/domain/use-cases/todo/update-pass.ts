import { updatePass } from "../../dtos/todos";
import { registerUser } from "../../dtos/todos/entities/user.entity";
import { UserRepository } from "../../repositories/user-repository";

export interface UpdateUserPass {
  execute(dto: updatePass): Promise<registerUser>;
}

export class createTod implements UpdateUserPass {
  constructor(private readonly reporsitory: UserRepository) {}

  execute(dto: updatePass): Promise<registerUser> {
    return this.reporsitory.updatePass(dto);
  }
}
