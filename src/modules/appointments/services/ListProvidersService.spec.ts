import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUserRepository: FakeUserRepository;
let listProvidersService: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvidersService = new ListProvidersService(
      fakeUserRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list providers execept the logged user', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'leandroun',
      email: 'leandroun@example.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'leandrotwo',
      email: 'leandrotwo@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'leandro',
      email: 'leandro@example.com',
      password: '123456',
    });

    const findProviders = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(findProviders).toEqual([user1, user2]);
  });
});
