import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/storageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateAvatarService from './UpdateUserAvatar';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateAvatar: UpdateAvatarService;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateAvatar = new UpdateAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to update a user avatar', async () => {
    const user = await fakeUserRepository.create({
      name: 'leandro',
      email: 'leandro@example.com',
      password: '123456',
    });

    await updateAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should not be able to update a non existing user', async () => {
    await expect(
      updateAvatar.execute({
        user_id: 'any-non-existing-user',
        avatarFileName: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'leandro',
      email: 'leandro@example.com',
      password: '123456',
    });

    await updateAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png',
    });

    await updateAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.png',
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.png');

    expect(user.avatar).toBe('avatar2.png');
  });
});
