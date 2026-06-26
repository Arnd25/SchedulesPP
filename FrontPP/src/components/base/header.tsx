import React from 'react';
import Container from "@/components/base/container";
import Navigation from "@/components/base/navigation";
import AuthControl from "@/modules/auth/ui/auth-control";

const Header = () => {
    return (
        <header className="py-4 bg-card border-b border-border" id="header">
            <Container className="flex items-center">
               <Navigation />
               <AuthControl />
            </Container>
        </header>
    );
};

export default Header;