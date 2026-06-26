"use client"
import { cn } from "@/shared/lib/utils";
import { useLoginForm } from "@/modules/auth/hooks/use-login-form";
import { Button } from "@/components/ui/button";

interface Props {
    className?: string;
}

export const LoginForm: React.FC<Props> = ({ className }) => {
    const { onSubmit, form, isPending } = useLoginForm();
    const { errors } = form.formState;
    return (
        <form onSubmit={onSubmit} className="grid gap-y-2.5 " aria-label="Тело формы">
            <div aria-label="Поле формы" className="grid gap-y-1.5">
                <label htmlFor="email" className="text-xl">Введите email</label>
                <input {...form.register('email')} id="email" type="email" className="px-3 py-2.5 bg-white border border-border rounded-lg" placeholder="user@example.com" />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div aria-label="Поле формы" className="grid gap-y-1.5">
                <label htmlFor="password" className="text-xl">Введите пароль</label>
                <input {...form.register('password')} id="password" type="password" className="px-3 py-2.5 bg-white border border-border rounded-lg" />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <div className="pt-4">
                <Button type={'submit'} disabled={isPending} className="w-full py-5 text-2xl font-normal rounded-lg cursor-pointer">
                    {isPending ? "Переход в личный кабинет" : "Войти"}
                </Button>
            </div>
        </form>
    );
}