import { Not, getRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepositories';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/appointments/dtos/iFindAllProvidersDTO';

class UserRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders({
    exception_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    if (exception_user_id) {
      const users = await this.ormRepository.find({
        where: {
          id: Not(exception_user_id),
        },
      });
      return users;
    }
    const users = await this.ormRepository.find();
    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { id },
    });

    return findUser || undefined;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
    });

    return findUser || undefined;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(userData: User): Promise<User> {
    return this.ormRepository.save(userData);
  }
}

export default UserRepository;
