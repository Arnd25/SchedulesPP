"use server";

import { revalidatePath } from "next/cache";
import { API_ROUTES } from "@/shared/routes/api.route";
import { APP_ROUTES } from "@/shared/routes/app.route";
import { api } from "@/config/http/server.http";
import { Department } from "@/shared/types/department.enum";

export interface UpdateTeacherDto {
    id: string;
    name: string;
    department: Department;
    mainDisciplines: string[];  // Массив ID (строк)
    additionalDisciplines: string[];  // Массив ID (строк)
}

export async function UpdateTeacher(formData: UpdateTeacherDto) {
    try {
        const response = await api.patch(API_ROUTES.teacher.UPDATE(formData.id), {
            name: formData.name,
            department: formData.department,
            mainDisciplines: formData.mainDisciplines,
            additionalDisciplines: formData.additionalDisciplines,
        });

        revalidatePath(APP_ROUTES.teachers());

        return {
            success: true,
            data: response.data,
            message: "Преподаватель успешно обновлён",
        };
    } catch (error) {
        console.error("Error updating teacher:", error);
        return {
            success: false,
            message: "Ошибка при обновлении преподавателя",
        };
    }
}