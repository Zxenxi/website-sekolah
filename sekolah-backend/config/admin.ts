type Env = {
  (key: string, defaultValue?: any): any;
  bool?: (key: string, defaultValue?: boolean) => boolean;
};

export default ({ env }: { env: Env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: typeof env.bool === 'function' ? env.bool('FLAG_NPS', true) : true,
    promoteEE: typeof env.bool === 'function' ? env.bool('FLAG_PROMOTE_EE', true) : true,
  },
});
