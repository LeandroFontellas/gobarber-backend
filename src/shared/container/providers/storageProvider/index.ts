import { container } from 'tsyringe';
import storageConfig from '@config/storage.ts';
import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  S3: S3StorageProvider,
};
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[storageConfig.driver],
);
