import {
  CreateUserDto,
  UpdateUser,
  UserDatasource,
  UserRepository,
  registerUser,
  updatePass,
} from "../../../domain";

export class TodoRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDatasource) {}

  create(createUserDto: CreateUserDto): Promise<registerUser> {
    return this.datasource.create(createUserDto);
  }
  findById(id: number): Promise<registerUser> {
    return this.datasource.findById(id);
  }
  updateById(updateUser: UpdateUser): Promise<registerUser> {
    return this.datasource.updateById(updateUser);
  }
  updatePass(UpdatePass: updatePass): Promise<registerUser> {
    return this.datasource.updatePass(UpdatePass);
  }
}
