"use server"
import {cookies} from "next/headers";
import {serviceAction} from "@/config/actions/service.action";
import {logoutSchema} from "@/modules/auth/models/logout.schema";
import {API_ROUTES} from "@/shared/routes/api.route";
import {APP_ROUTES} from "@/shared/routes/app.route";

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.getAll().forEach((cookie) => {
       cookieStore.delete(cookie.name);
    });

    return serviceAction({
        schema: logoutSchema,
        endpoint: API_ROUTES.AUTH.LOGOUT(),
        revalidate: APP_ROUTES.home(),
        redirectTo: APP_ROUTES.home(),
    }, {});
}