interface IStorageConfig {
  driver: 'disk' | 'S3';
  config: {
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',
  config: {
    aws: {
      bucket: 'bucket que vc criou no aws',
    },
  },
} as IStorageConfig;
