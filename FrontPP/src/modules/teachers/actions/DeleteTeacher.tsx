"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/config/http/server.http";
import { API_ROUTES } from "@/shared/routes/api.route";

export async function DeleteTeacher(id: string) {
    try {
        await api.delete(API_ROUTES.teacher.DELETE(id));
        
        revalidatePath("/teachers");
        
        return { 
            success: true, 
            message: "Преподаватель успешно удалён" 
        };
    } catch (error) {
        console.error("Error deleting teacher:", error);
        return { 
            success: false, 
            message: "Ошибка при удалении преподавателя" 
        };
    }
}