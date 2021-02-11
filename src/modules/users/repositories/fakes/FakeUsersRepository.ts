import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepositories';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';
import IFindAllProvidersDTO from '@modules/appointments/dtos/iFindAllProvidersDTO';

class FakeUserRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders({
    exception_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (exception_user_id) {
      users = this.users.filter(user => user.id !== exception_user_id);
    }

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const finduserbyid = this.users.find(user => user.id === id);

    return finduserbyid;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const finduserbyemail = this.users.find(user => user.email === email);

    return finduserbyemail;
  }

  public async create(UserData: ICreateUserDTO): Promise<User> {
    const createUser = new User();

    Object.assign(createUser, { id: uuid() }, UserData);

    this.users.push(createUser);

    return createUser;
  }

  public async save(userData: User): Promise<User> {
    const findIndex = this.users.findIndex(user => userData.id === user.id);

    this.users[findIndex] = userData;

    return userData;
  }
}

export default FakeUserRepository;
