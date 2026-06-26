"use client"

import { cn } from "@/shared/lib/utils";
import { useRegisterForm } from "@/modules/auth/hooks/use-register-form";
import { Button } from "@/components/ui/button";

interface Props {
    className?: string;
};

export const RegisterForm: React.FC<Props> = ({ className }) => {
    const { form, isPending, onSubmit } = useRegisterForm();
    const { errors } = form.formState;
    return (
        <form onSubmit={onSubmit} className="grid gap-y-2.5" aria-label="Тело формы">
            <div aria-label="Поле формы" className="grid gap-y-1.5">
                <label htmlFor="name" className="text-xl">Введите имя</label>
                <input {...form.register('firstName')} id="name" type="text" className="px-3 py-2.5 border border-border rounded-lg bg-white" placeholder="Иванов Николай" />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
            </div>
            <div aria-label="Поле формы" className="grid gap-y-1.5">
                <label htmlFor="name" className="text-xl">Введите имя</label>
                <input {...form.register('lastName')} id="name" type="text" className="px-3 py-2.5 border border-border rounded-lg bg-white" placeholder="Иванов Николай" />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
            </div>
            <div aria-label="Поле формы" className="grid gap-y-1.5">
                <label htmlFor="email" className="text-xl">Введите email</label>
                <input {...form.register('email')} id="email" type="email" className="px-3 py-2.5 border border-border rounded-lg bg-white" placeholder="user@example.com" />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div aria-label="Поле формы" className="grid gap-y-1.5">
                <label htmlFor="password" className="text-xl">Придумайте пароль</label>
                <input {...form.register('password')} id="password" type="password" className="px-3 py-2.5 border border-border rounded-lg bg-white" />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <div aria-label="Поле формы" className="grid gap-y-1.5">
                <label htmlFor="passwordConfirm" className="text-xl">Повторите пароль</label>
                <input {...form.register('passwordConfirm')} id="passwordConfirm" type="password" className="px-3 py-2.5 border border-border rounded-lg bg-white" />
                {errors.passwordConfirm && <p className="text-sm text-red-500">{errors.passwordConfirm.message}</p>}
            </div>
            <div className="pt-4">
                <Button type={'submit'} disabled={isPending} className="w-full py-5 text-2xl font-normal rounded-lg cursor-pointer">
                    {isPending ? "Создание аккаунта" : "Зарегистрироваться"}
                </Button>
            </div>
        </form>
    );
}