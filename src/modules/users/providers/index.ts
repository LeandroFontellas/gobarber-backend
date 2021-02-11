import { container } from 'tsyringe';

import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokenRepository';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
