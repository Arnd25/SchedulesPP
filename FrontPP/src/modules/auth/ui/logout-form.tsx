"use client"
import { Button } from "@/components/ui/button";
import { useLogoutForm } from "@/modules/auth/hooks/use-logout-form";

export function LogoutForm() {
    const { onSubmit, isPending } = useLogoutForm();
    return (
        <form onSubmit={onSubmit}>
            <Button variant='outline' type='submit' disabled={isPending}>
                {isPending ? 'Выход...' : 'Выход'}
            </Button>
        </form>
    );
}