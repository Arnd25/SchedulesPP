"use client"
import {useLogoutForm} from "@/modules/auth/hooks/use-logout-form";
import { Box, Button } from '@chakra-ui/react';

export function LogoutForm() {
    const { onSubmit, isPending } = useLogoutForm();
    return(
        <Box flex="1">
            <form onSubmit={onSubmit}>
                <Button variant='outline' type='submit' isLoading={isPending}>
                    {isPending ? 'Выход...' : 'Выход'}
                </Button>
            </form>
        </Box>
    );
}