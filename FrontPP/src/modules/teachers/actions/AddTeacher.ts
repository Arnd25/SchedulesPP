"use server";

import { revalidatePath } from "next/cache";
import { API_ROUTES } from "@/shared/routes/api.route";
import { api } from "@/config/http/server.http";
import { Department } from "@/shared/types/department.enum";
import { APP_ROUTES } from "@/shared/routes/app.route";
import { TeacherFormData } from "../models";

export async function addTeacher(formData: TeacherFormData) {
    try {
        const response = await api.post(API_ROUTES.teacher.CREATE(), {
            name: formData.name,
            department: formData.department,
            mainDisciplines: formData.mainDisciplines,
            additionalDisciplines: formData.additionalDisciplines,
        });

        revalidatePath(APP_ROUTES.teachers());

        return {
            success: true,
            data: response.data,
            message: "Преподаватель успешно добавлен",
        };
    } catch (error) {
        console.error("Error adding teacher:", error);
        return {
            success: false,
            message: "Ошибка при добавлении преподавателя",
        };
    }
}