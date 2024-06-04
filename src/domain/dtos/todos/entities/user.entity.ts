export class registerUser {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public emailValidate: string,
    public password: string,
    public accessToken: string
  ) {}

  public static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, emailValidate, password, accessToken } =
      object;

    if (!_id && !id) throw "No se encontró el ID";
    if (!name) throw "No ingresó el nombre";
    if (!email) throw "No inngresó el email";
    // if (emailValidate === undefined) throw "No fue validado el email";
    if (!password) throw "No ingresó el password";

    return new registerUser(
      id || _id,
      name,
      email,
      emailValidate,
      password,
      accessToken
    );
  }
}
