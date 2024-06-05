import { CreateUserDto, UpdateUser } from "../dtos/todos";
import { registerUser } from "../dtos/todos/entities/user.entity";
import { loginUser } from "../dtos/todos/login-user";
import { updatePass } from "../dtos/todos/update-pass";
import { validateEmail } from "../dtos/todos/validate-email";

export abstract class UserDatasource {
  abstract create(createUserDto: CreateUserDto): Promise<registerUser>;

  abstract findById(id: number): Promise<registerUser>;
  abstract updateById(updateUser: UpdateUser): Promise<registerUser>;
  abstract updatePass(UpdatePass: updatePass): Promise<registerUser>;
  abstract loginAUser(LoginUser: loginUser): Promise<registerUser>;
  abstract validarMail(ValidateEmail: validateEmail): Promise<registerUser>;
}
