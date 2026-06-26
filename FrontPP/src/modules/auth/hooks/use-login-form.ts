"use client";

import {useServerForm} from "@/config/forms/use-server.form";
import {LoginFormValidated, loginSchema} from "@/modules/auth/models/login.schema";
import {loginAction} from "@/modules/auth/actions/login";

export function useLoginForm() {
    return useServerForm<LoginFormValidated>({
        schema: loginSchema,
        action: loginAction,
        defaultValues: {
            email: "",
            password: "",
        },
    });
}