export enum AppRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export interface JwtPayload {
    sub: string;
    email: string;
    role: AppRole;
}