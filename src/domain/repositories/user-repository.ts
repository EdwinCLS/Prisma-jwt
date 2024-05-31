import { CreateUserDto, UpdateUser } from "../dtos/todos";
import { registerUser } from "../dtos/todos/entities/user.entity";
import { updatePass } from "../dtos/todos/update-pass";

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<registerUser>;

  abstract findById(id: number): Promise<registerUser>;
  abstract updateById(updateUser: UpdateUser): Promise<registerUser>;
  abstract updatePass(UpdatePass: updatePass): Promise<registerUser>;
}
