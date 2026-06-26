import { group } from "console";

export const API_ROUTES = {
    AUTH: {
        LOGIN: () => "/auth/login",
        REGISTER: () => "/auth/register",
        LOGOUT: () => "/auth/logout",
        // REFRESH: () => "/auth/refresh",
    },
    USERS: {
        ALL: () => "/users",
        SHOW: (id: string) => "/users/" + id,
        CREATE: () => "/users",
        UPDATE: (id: string) => "/users/" + id,
        DELETE: (id: string) => "/users/" + id,
        ME: () => "/users/me",
    },
    disciplines: {
        ALL: () => "/disciplines",
        SHOW: (id: string) => "/disciplines/" + id,
        CREATE: () => "/disciplines",
        UPDATE: (id: string) => "/disciplines/" + id,
        DELETE: (id: string) => "/disciplines/" + id,
        COUNT: () => "/disciplines/count",

    },
    group: {
        ALL: () => "/group",
        SHOW: (id: string) => "/group/" + id,
        CREATE: () => "/group",
        UPDATE: (id: string) => "/group/" + id,
        DELETE: (id: string) => "/group/" + id,
        COUNT: () => "/group/count",
    },
    teacher: {
        ALL: () => "/teacher",
        SHOW: (id: string) => "/teacher/" + id,
        CREATE: () => "/teacher",
        UPDATE: (id: string) => "/teacher/" + id,
        DELETE: (id: string) => "/teacher/" + id,
        COUNT: () => "/teacher/count",
    },
    pairs: {
        ALL: () => "/pairs",
        SHOW: (id: string) => "/pairs/" + id,
        CREATE: () => "/pairs",
        UPDATE: (id: string) => "/pairs/" + id,
        DELETE: (id: string) => "/pairs/" + id,
    },
    schedules: {
        ALL: () => "/schedules",
        SHOW: (id: string) => "/schedules/" + id,
        CREATE: () => "/schedules",
        UPDATE: (id: string) => "/schedules/" + id,
        DELETE: (id: string) => "/schedules/" + id,
        GENERATE: () => '/schedules/generate/',
        DELETE_DAY: (groupId:string, date: string) => `/schedules/day/${groupId}/${date}`,
    },
} as const;