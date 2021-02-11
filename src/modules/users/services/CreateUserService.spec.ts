import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let userService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeHashProvider = new FakeHashProvider();

    userService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create a user', async () => {
    const newUser = await userService.execute({
      name: 'leandro',
      email: 'leandrofontellas@gmail.com',
      password: '123456',
    });

    expect(newUser).toHaveProperty('id');
    expect(newUser.email).toBe('leandrofontellas@gmail.com');
  });

  it('should not be able to create a user with a already in use email', async () => {
    await userService.execute({
      name: 'leandro',
      email: 'leandrofontellas@gmail.com',
      password: '123456',
    });

    await expect(
      userService.execute({
        name: 'leandro2',
        email: 'leandrofontellas@gmail.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
