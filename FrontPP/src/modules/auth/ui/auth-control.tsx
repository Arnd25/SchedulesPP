import React from 'react';
import {getAccessToken} from "@/shared/lib/cookies";
import {LogoutForm} from "@/modules/auth/ui/logout-form";
import AuthAction from "@/components/base/auth-action";
import { Box } from '@chakra-ui/react';

const AuthControl = async () => {
    const isAuth = await getAccessToken();
    return (
        <Box ml="auto">
            {isAuth ? <LogoutForm /> : <AuthAction />}
        </Box>
    );
};

export default AuthControl;