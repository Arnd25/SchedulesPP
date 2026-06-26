"use client"

import {useState} from "react";
import {logoutAction} from "@/modules/auth/actions/logout";
import {redirect} from "next/navigation";
import {APP_ROUTES} from "@/shared/routes/app.route";

export function useLogoutForm() {
    const [isPending, setIsPending] = useState(false);
    const onSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsPending(true);

        try {
            await logoutAction();
            redirect(APP_ROUTES.home());
        } catch (error) {
            console.error("Logout error", error);
        }
    }
    return { onSubmit, isPending };
}