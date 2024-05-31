import { CreateUserDto } from "../../dtos/todos";
import { registerUser } from "../../dtos/todos/entities/user.entity";
import { UserRepository } from "../../repositories/user-repository";

export interface CreateUserCase {
  execute(dto: CreateUserDto): Promise<registerUser>;
}

export class createTodo implements CreateUserCase {
  constructor(private readonly reporsitory: UserRepository) {}

  execute(dto: CreateUserDto): Promise<registerUser> {
    return this.reporsitory.create(dto);
  }
}
