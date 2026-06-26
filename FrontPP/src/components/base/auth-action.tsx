import React from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {APP_ROUTES} from "@/shared/routes/app.route";

const AuthAction = () => {
    return (
        <div className="flex items-center gap-x-4">
            <Button variant={'outline'} asChild>
                <Link href={APP_ROUTES.AUTH.REGISTER()}>Регистрация</Link>
            </Button>
            <Button asChild>
                <Link href={APP_ROUTES.AUTH.LOGIN()}>Войти</Link>
            </Button>
        </div>
    );
};

export default AuthAction;