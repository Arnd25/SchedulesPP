export enum Department {
    FINANCE = "Финансы",
    AUTOMATION = "Автоматизация",
    TRANSPORT = "Транспорт",
    LAND_MANAGEMENT = "Землеустройство",
}

export const DEPARTMENT_LABELS: Record<Department, string> = {
    [Department.FINANCE]: "Финансы",
    [Department.AUTOMATION]: "Автоматизация",
    [Department.TRANSPORT]: "Транспорт",
    [Department.LAND_MANAGEMENT]: "Землеустройство",
};

export const DEPARTMENT_LIST = Object.values(Department);