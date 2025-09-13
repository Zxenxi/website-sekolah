import path from 'path';

type Env = {
  (key: string, defaultValue?: any): any;
  int?: (key: string, defaultValue?: number) => number;
  bool?: (key: string, defaultValue?: boolean) => boolean;
};

export default ({ env }: { env: Env }) => {
  const client = (env('DATABASE_CLIENT', 'sqlite') as 'mysql' | 'postgres' | 'sqlite');

  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
  port: typeof env.int === 'function' ? env.int('DATABASE_PORT', 3306) : 3306,
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
  ssl: (typeof env.bool === 'function' ? env.bool('DATABASE_SSL', false) : false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: typeof env.bool === 'function' ? env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true) : true,
        },
      },
      pool: {
        min: typeof env.int === 'function' ? env.int('DATABASE_POOL_MIN', 2) : 2,
        max: typeof env.int === 'function' ? env.int('DATABASE_POOL_MAX', 10) : 10,
      },
    },
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', 'localhost'),
  port: typeof env.int === 'function' ? env.int('DATABASE_PORT', 5432) : 5432,
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
  ssl: (typeof env.bool === 'function' ? env.bool('DATABASE_SSL', false) : false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: typeof env.bool === 'function' ? env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true) : true,
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: {
        min: typeof env.int === 'function' ? env.int('DATABASE_POOL_MIN', 2) : 2,
        max: typeof env.int === 'function' ? env.int('DATABASE_POOL_MAX', 10) : 10,
      },
    },
    sqlite: {
      connection: {
  filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
  acquireConnectionTimeout: typeof env.int === 'function' ? env.int('DATABASE_CONNECTION_TIMEOUT', 60000) : 60000,
    },
  };
};
