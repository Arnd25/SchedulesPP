'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

interface FormState {
    success?: boolean;
    error?: string;
    message?: string;
}

interface Props {
    state: FormState | null;
    duration?: number;
}

export function Notification({ state, duration = 4000 }: Props) {
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        setIsDismissed(false);
    }, [state]);

    const hasContent = state && (state.message || state.error);
    const isVisible = Boolean(hasContent) && !isDismissed;

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setIsDismissed(true);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration]);

    if (!state) return null;

    const isError = state.error !== undefined && state.error !== null && state.error !== '';
    const isSuccess = state.success === true && !isError;

    const text = isError ? state.error : state.message;

    if (!text) return null;

    const styles = isSuccess
        ? 'bg-green-100 text-green-800 border-green-300'
        : isError
            ? 'bg-red-100 text-red-800 border-red-300'
            : 'bg-gray-100 text-gray-800 border-gray-300';

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="notification"
                    initial={{ opacity: 0, y: -10, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -10, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className={`fixed top-3 right-3 z-50 mt-2.5 p-4 rounded-lg border shadow-lg max-w-md ${styles}`}>
                    <div className="flex items-start gap-3">
                        {isSuccess ? (
                            <FiCheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        ) : (
                            <FiAlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        )}

                        <span className="text-sm flex-1">{text}</span>

                        <button
                            onClick={() => setIsDismissed(true)}
                            className="p-1 hover:bg-black/5 rounded shrink-0"
                            aria-label="Закрыть"
                        >
                            <FiX className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}