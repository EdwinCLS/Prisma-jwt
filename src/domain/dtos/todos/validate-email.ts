import { regularExps } from "../../../config";

export class validateEmail {
  constructor(
    public readonly email: string,
    public readonly accessToken: string
  ) {}

  static create(props: { [key: string]: any }): [string?, validateEmail?] {
    const { email, accessToken } = props;
    if (!email) return ["El correo no es válido", undefined];
    if (!regularExps.email.test(email))
      return ["El email no es válido", undefined];

    return [undefined, new validateEmail(email, accessToken)];
  }
}
