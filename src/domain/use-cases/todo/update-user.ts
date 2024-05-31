import { UpdateUser } from "../../dtos/todos";
import { registerUser } from "../../dtos/todos/entities/user.entity";
import { UserRepository } from "../../repositories/user-repository";

export interface UpdateUserCase {
  execute(dto: UpdateUser): Promise<registerUser>;
}

export class createuser implements UpdateUserCase {
  constructor(private readonly reporsitory: UserRepository) {}

  execute(dto: UpdateUser): Promise<registerUser> {
    return this.reporsitory.updateById(dto);
  }
}
