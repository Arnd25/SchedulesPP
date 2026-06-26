export const ENV = {
    API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:9000/api',
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN ?? 'localhost',
    NODE_ENV: process.env.NODE_ENV ?? 'development',
} as const;

if (!ENV.API_URL) {
    throw new Error('Не задана переменная NEXT_PUBLIC_API_URL');
}