import { access } from "fs";
import { JwtAdapter, bcryptAdapter } from "../../config";
import { prisma } from "../../data/postgres";
import {
  CreateUserDto,
  UpdateUser,
  UserDatasource,
  loginUser,
  registerUser,
  updatePass,
} from "../../domain";

export class TodoDatasourceImplementation implements UserDatasource {
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
    const accessToken = JwtAdapter.generateToken({
      id: login.id,
      email: login.email,
    });

    const { password, ...RegisterUser } = registerUser.fromObject(login);
    //const token = JwtAdapter.generateToken({ id: login.id });

    return RegisterUser as registerUser;
  }
  async create(createUserDto: CreateUserDto): Promise<registerUser> {
    const Userexist = await prisma.usuario.findFirst({
      where: { email: createUserDto.email },
    });
    if (Userexist) throw "El usuario ya existe";

    //usuario.password = bcryptAdapter.hash(createUserDto.password);
    const usuario = await prisma.usuario.create({ data: createUserDto! });

    const { password, ...registerUSER } = registerUser.fromObject(usuario);

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
}
