export const APP_ROUTES = {
    root: (path: string = "") => path,
    home: () => APP_ROUTES.root("/"),
    dashboard: () => APP_ROUTES.root("/dashboard"),
    group: () => APP_ROUTES.root('/group'),
    discipline: () => APP_ROUTES.root('/discipline'),
    teachers: () => APP_ROUTES.root('/teachers'),
    edit: () => APP_ROUTES.root('/edit'),
    view: () => APP_ROUTES.root('/view'),
    pair: () => APP_ROUTES.root('/pair'),
    users: () => APP_ROUTES.root('/users'),
};