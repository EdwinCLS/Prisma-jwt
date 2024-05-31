import { regularExps } from "../../../config";
import { regularNum } from "../../../config/regular-num";

export class UpdateUser {
  private constructor(
    public readonly id: number,
    private readonly name: string,
    private readonly email: string,
    private readonly numTel: number,
    private readonly direccion: string
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.name) returnObj.name = this.name;
    if (this.email) returnObj.email = this.email;
    if (this.numTel) returnObj.name = this.numTel;
    if (this.direccion) returnObj.name = this.direccion;

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateUser?] {
    const { id, name, email, numTel, direccion } = props;

    if (!id || isNaN(Number(id))) return ["El id solo consta de números"];
    if (!name) return ["El nombre no es válido", undefined];

    if (!email) return ["El correo no es válido", undefined];
    if (!regularExps.email.test(email))
      return ["El email no es válido", undefined];
    if (isNaN(Number(numTel))) return ["Solo se aceptan números", undefined];
    if (!direccion) return ["No ha ingresado la dirección", undefined];

    return [undefined, new UpdateUser(id, name, email, numTel, direccion)];
  }
}
