import { bcryptAdapter, regularExps } from "../../../config";

export class CreateUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateUserDto?] {
    const { name, email, password } = props;

    if (!name) return ["El nombre no es válido", undefined];

    if (!email) return ["El correo no es válido", undefined];
    if (!regularExps.email.test(email))
      return ["El email no es válido", undefined];
    if (!password) return ["Contraseña no ingresada", undefined];
    if (password.length < 6)
      return ["La contraseña debe contener al menos 6 caracteres", undefined];

    return [undefined, new CreateUserDto(name, email, password)];
  }
}
