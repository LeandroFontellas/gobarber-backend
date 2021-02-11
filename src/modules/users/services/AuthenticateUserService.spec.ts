import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateService: AuthenticateUserService;
let createUserService: CreateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeHashProvider = new FakeHashProvider();

    authenticateService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to authenticate a user', async () => {
    await createUserService.execute({
      name: 'leandro',
      email: 'leandrofontellas@gmail.com',
      password: '123456',
    });

    const authenticatedUser = await authenticateService.execute({
      email: 'leandrofontellas@gmail.com',
      password: '123456',
    });

    expect(authenticatedUser).toHaveProperty('token');
  });

  it('should not be able to authenticate without a valid email/password combination', async () => {
    await createUserService.execute({
      name: 'leandro',
      email: 'leandrofontellas@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateService.execute({
        email: 'leandrofontellas@gmail.com',
        password: 'senhaerrada',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate without finding a user in the database', async () => {
    await createUserService.execute({
      name: 'leandro',
      email: 'leandrofontellas@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateService.execute({
        email: 'leandrofontellasquenaoexiste@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
