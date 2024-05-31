export class updatePass {
  constructor(public readonly id: number, private readonly password: string) {}

  get values() {
    const returnObject: { [key: string]: any } = {};
    if (this.password) returnObject.password = this.password;

    return returnObject;
  }
  static create(props: { [key: string]: any }): [string?, updatePass?] {
    const { id, password } = props;

    if (!id || isNaN(Number(id))) return ["El id solo consta de números"];
    if (!password) return ["Contraseña no ingresada", undefined];
    if (password.length < 6)
      return ["La contraseña debe contener al menos 6 caracteres", undefined];

    return [undefined, new updatePass(id, password)];
  }
}
