import User from '@modules/users/infra/typeorm/entities/User';

import IUserCreateDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/appointments/dtos/iFindAllProvidersDTO';

export default interface IUsersRepositories {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: IUserCreateDTO): Promise<User>;
  save(data: IUserCreateDTO): Promise<User>;
}
