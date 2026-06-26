"use server"

import {serviceAction} from "@/config/actions/service.action";
import {registerSchema} from "@/modules/auth/models/register.schema";
import {API_ROUTES} from "@/shared/routes/api.route";
import {APP_ROUTES} from "@/shared/routes/app.route";

export async function registerAction(data: unknown) {
    return serviceAction({
        schema: registerSchema,
        endpoint: API_ROUTES.AUTH.REGISTER(),
        revalidate: APP_ROUTES.home(),
        redirectTo: APP_ROUTES.home(),
    }, data);
}