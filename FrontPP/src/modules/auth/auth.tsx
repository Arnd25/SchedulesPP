'use client';

import { useActionState, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RegisterForm } from './ui/register-form';
import { LoginForm } from './ui/login-form';
export function Auth() {
    const [selectedTab, setSelectedTab] = useState("login")


    return (
        <div className="bg-card mt-60 px-12 py-7 flex flex-col gap-2.5 w-120 rounded-[10px] transition-all duration-500">
            <Tabs onValueChange={setSelectedTab} defaultValue="login" className="transition-all flex flex-col duration-300 ease-in-out opacity-100">

                <TabsList className="flex w-full h-fit!  bg-transparent gap-13">
                    <TabsTrigger
                        value="login"
                        className="text-2xl data-[state=active]:border-b-primary! px-1 pb-2 after:hidden flex-none rounded-none  data-[state=active]:bg-transparent h-fit data-[state=active]:shadow-none! data-[state=active]:text-4xl">
                        Вход
                    </TabsTrigger>
                    <TabsTrigger
                        value="register"
                        className="text-2xl data-[state=active]:border-b-primary! px-1 pb-2 after:hidden flex-none rounded-none  data-[state=active]:bg-transparent h-fit data-[state=active]:shadow-none! data-[state=active]:text-4xl">
                        Регистрация
                    </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="popLayout">
                    {selectedTab === 'login' ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -80 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.15 }}
                        >
                            <TabsContent value="login" forceMount>
                                <LoginForm />
                            </TabsContent>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="register"
                            initial={{ opacity: 0, x: 80 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.15 }}
                        >
                            <TabsContent value="register" forceMount>
                                <RegisterForm />
                            </TabsContent>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Tabs>

        </div >

    );
}