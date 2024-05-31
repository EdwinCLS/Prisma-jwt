import { error } from "node:console";
import { prisma } from "../../data/postgres";
import {
  CreateUserDto,
  UpdateUser,
  UserDatasource,
  registerUser,
  updatePass,
} from "../../domain";

export class TodoDatasourceImplementation implements UserDatasource {
  async create(createUserDto: CreateUserDto): Promise<registerUser> {
    const userExist = await prisma.usuario.findFirst({
      where: { email: createUserDto.email },
    });

    const usuario = await prisma.usuario.create({
      data: createUserDto!,
    });
    return registerUser.fromObject(usuario);
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
    const upUser = await prisma.usuario.update({
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
