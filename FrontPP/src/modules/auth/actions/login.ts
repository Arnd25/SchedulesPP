"use server"

import { serviceAction } from "@/config/actions/service.action";
import { loginSchema } from "@/modules/auth/models/login.schema";
import { API_ROUTES } from "@/shared/routes/api.route";
import { APP_ROUTES } from "@/shared/routes/app.route";

export async function loginAction(data: unknown) {
    console.log('Endpoint:', API_ROUTES.AUTH.LOGIN());
    return serviceAction({
        schema: loginSchema,
        endpoint: API_ROUTES.AUTH.LOGIN(),
        revalidate: APP_ROUTES.home(),
        redirectTo: APP_ROUTES.dashboard(),
    }, data);
}