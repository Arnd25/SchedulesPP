import {getUserDataFromCookies} from "@/shared/lib/cookies";
import {redirect} from "next/navigation";
import {APP_ROUTES} from "@/shared/routes/app.route";
import {AppRole} from "@/shared/types/jwt.type";

export async function requireAuth() {
    const user = await getUserDataFromCookies();
    if (!user) redirect(APP_ROUTES.home());
    if (user.role !== AppRole.USER) redirect(APP_ROUTES.home());

    return user;
}

export async function requireGuest() {
    const user = await getUserDataFromCookies();
    if (user) redirect(APP_ROUTES.home());
}

export async function requireAdmin() {
    const user = await getUserDataFromCookies();
    if (!user) redirect(APP_ROUTES.home());
    if (user.role !== AppRole.ADMIN) redirect(APP_ROUTES.home());

    return user;
}