import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfileService = new ShowProfileService(fakeUserRepository);
  });

  it('should be able to show a user profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'leandro',
      email: 'leandro@example.com',
      password: '123456',
    });

    const findUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(findUser.name).toBe('leandro');
    expect(findUser.email).toBe('leandro@example.com');
  });

  it('should not be able to find a non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
