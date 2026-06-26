"use client";

import { useState, useTransition } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TeacherFormModal } from "./TeacherForm";
import { Discipline } from "../models";

interface AddTeacherButtonProps {
    disciplines: Discipline[];
}

export function AddTeacherButton({ disciplines }: AddTeacherButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="h-11 cursor-pointer flex items-center gap-2 text-lg font-normal px-6"
            >
                Добавить нового +
            </Button>

            {isOpen && (
                <TeacherFormModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    disciplines={disciplines}
                />
            )}
        </>
    );
}
