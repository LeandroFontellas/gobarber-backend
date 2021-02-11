/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepositories';
import IStorageProvider from '@shared/container/providers/storageProvider/models/IStorageProvider';

interface IRequestDTO {
  user_id: string;
  avatarFileName: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    avatarFileName,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    // vendo se ele ja tinha um avatar pra deletar o antigo e colocar o novo
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }
    const filename = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = filename;
    // aqui ele atualizou só um campo dele e salvou de novo, caso o id nao exista ele cria um novo
    // e caso o id ja exista ele atualiza no banco esse usuario
    await this.usersRepository.save(user);

    return user;
  }
}
