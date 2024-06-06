import { access } from "fs";
import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { prisma } from "../../data/postgres";
const { query } = require("express-validator");
import {
  CreateUserDto,
  UpdateUser,
  UserDatasource,
  loginUser,
  registerUser,
  updatePass,
} from "../../domain";
import { EmailService } from "../email.service";
import { validateEmail } from "../../domain/dtos/todos/validate-email";

export class TodoDatasourceImplementation implements UserDatasource {
  constructor(private readonly emailService: EmailService) {}

  async loginAUser(LoginUser: loginUser): Promise<registerUser> {
    const login = await prisma.usuario.findFirst({
      where: { email: LoginUser.email },
    });
    if (!login) throw "El usuario no existe";

    const isMatch = await prisma.usuario.findFirst({
      where: { password: LoginUser.password },
    });
    if (!isMatch) throw "Contraseña incorrecta";

    // const isMatch = bcryptAdapter.compare(LoginUser.password, login.password);
    // if (!isMatch) throw "Contraseña incorrecta";

    const { password, ...RegisterUser } = registerUser.fromObject(login);
    //Generar token
    const accesstoken = await JwtAdapter.generateToken({
      id: login.id,
    });
    if (!accesstoken) throw "Error while creating JWT";
    RegisterUser.accessToken = accesstoken as string;
    return RegisterUser as registerUser;
  }

  async create(createUserDto: CreateUserDto): Promise<registerUser> {
    const Userexist = await prisma.usuario.findFirst({
      where: { email: createUserDto.email },
    });
    if (Userexist) throw "El usuario ya existe";

    const usuario = await prisma.usuario.create({ data: createUserDto! });

    //Email para la verificación
    await this.sendEmailValidation(usuario.email);

    const { password, ...registerUSER } = registerUser.fromObject(usuario);
    //Generar token
    const accesstoken = await JwtAdapter.generateToken({
      id: usuario.id,
    });
    if (!accesstoken) throw "Error while creating JWT";

    registerUSER.accessToken = accesstoken as string;

    return registerUSER as registerUser;
  }

  async findById(id: number): Promise<registerUser> {
    const usuario = await prisma.usuario.findFirst({
      where: { id },
    });
    if (!usuario) throw "Usuario no encontrado con el ID ingresado";
    return registerUser.fromObject(usuario);
  }
  async updateById(updateUser: UpdateUser): Promise<registerUser> {
    await this.findById(updateUser.id);
    const upUser = await prisma.perfilUser.update({
      where: { id: updateUser.id },
      data: updateUser!.values,
    });
    return registerUser.fromObject(upUser);
  }
  async updatePass(UpdatePass: updatePass): Promise<registerUser> {
    const updaPass = await this.findById(UpdatePass.id);
    const updatePass = await prisma.usuario.update({
      where: { id: UpdatePass.id },
      data: UpdatePass!.values,
    });

    return registerUser.fromObject(updatePass);
  }

  private sendEmailValidation = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw "Error al generar el token";

    const link = `${envs.WEBSERVICE_URL}/todos/api/user/validate/${token}`;
    const html = `<h1> Email validado</h1> 
    <p> Da click en el link para validar tu email </p>
    <p> Valida tu email: </p>
    <p><a href="${link}">Presione aquí para validar tu email</a></p>`;

    const options = {
      to: email,
      subject: "Validacion de email",
      htmlBody: html,
    };

    const isSent = await this.emailService.sendEmail(options);
    if (!isSent) throw new Error("Error al enviar el email");
    return true;
  };

  async validarMail(ValidateEmail: validateEmail): Promise<registerUser> {
    const { accessToken } = ValidateEmail;

    const payload = await JwtAdapter.validateToken(accessToken);
    if (!payload) throw "Token invalido";
    const { email } = payload as { email: string };
    if (!email) throw "Email invalido";

    const usuario = await prisma.usuario.findFirst({
      where: { email },
    });
    if (!usuario) throw "Usuario no encontrado";

    usuario.emailValidado = true;
    const upUser = await prisma.usuario.update({
      where: { id: usuario.id },
      data: usuario,
    });
    return registerUser.fromObject(upUser);
  }
}
