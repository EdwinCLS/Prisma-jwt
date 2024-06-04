import { regularExps } from "../../../config";

export class loginUser {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(props: { [key: string]: any }): [string?, loginUser?] {
    const { email, password } = props;

    if (!email) return ["El correo no es válido", undefined];
    if (!regularExps.email.test(email))
      return ["El email no es válido", undefined];

    return [undefined, new loginUser(email, password)];
  }
}
