import { regularExps } from "../../../config";
const { query } = require("express-validator");
export class validateEmail {
  constructor(
    //public readonly email: string,
    public readonly accessToken: string
  ) {}

  static create(props: { [key: string]: any }): [string?, validateEmail?] {
    const { accessToken } = props;

    if (!accessToken) return ["Token no se creo", undefined];

    // if (!email) return ["Correo no válido", undefined];
    // if (!regularExps.email.test(email))
    // return ["El email no es válido", undefined];

    return [undefined, new validateEmail(accessToken)];
  }
}
