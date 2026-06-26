import { useServerForm } from "@/config/forms/use-server.form";
import { RegisterFormValidated, registerSchema } from "@/modules/auth/models/register.schema";
import { registerAction } from "@/modules/auth/actions/register";

export function useRegisterForm() {
    return useServerForm<
        RegisterFormValidated,
        Omit<RegisterFormValidated, "passwordConfirm">
    >({
        schema: registerSchema,
        action: registerAction,
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
        mapData: (data) => {
            const { passwordConfirm, ...rest } = data;
            return rest;
        },
    });
}