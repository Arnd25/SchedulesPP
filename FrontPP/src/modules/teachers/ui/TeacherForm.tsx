"use client"
import { useState, useTransition } from "react";
import { Discipline } from "../models";
import { addTeacher } from "../actions/AddTeacher";
import { Department, DEPARTMENT_LIST } from "@/shared/types/department.enum";
import { X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";


interface TeacherFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    disciplines: Discipline[];
}

export function TeacherFormModal({
    isOpen,
    onClose,
    disciplines,
}: TeacherFormModalProps) {
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState<string>("");
    const [mainDisciplines, setMainDisciplines] = useState<string[]>([]);
    const [additionalDisciplines, setAdditionalDisciplines] = useState<string[]>([]);
    const [mainDisciplineInput, setMainDisciplineInput] = useState("");
    const [additionalDisciplineInput, setAdditionalDisciplineInput] = useState("");
    const [error, setError] = useState("");

    const handleAddMainDiscipline = () => {
        if (
            mainDisciplineInput.trim() &&
            !mainDisciplines.includes(mainDisciplineInput.trim())
        ) {
            setMainDisciplines([...mainDisciplines, mainDisciplineInput.trim()]);
            setMainDisciplineInput("");
        }
    };

    const handleRemoveMainDiscipline = (discipline: string) => {
        setMainDisciplines(mainDisciplines.filter((d) => d !== discipline));
    };

    const handleAddAdditionalDiscipline = () => {
        if (
            additionalDisciplineInput.trim() &&
            !additionalDisciplines.includes(additionalDisciplineInput.trim())
        ) {
            setAdditionalDisciplines([
                ...additionalDisciplines,
                additionalDisciplineInput.trim(),
            ]);
            setAdditionalDisciplineInput("");
        }
    };

    const handleRemoveAdditionalDiscipline = (discipline: string) => {
        setAdditionalDisciplines(
            additionalDisciplines.filter((d) => d !== discipline)
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("Введите ФИО преподавателя");
            return;
        }

        if (!selectedDepartment) {
            setError("Выберите кафедру");
            return;
        }

        startTransition(async () => {
            const result = await addTeacher({
                name,
                department: selectedDepartment as Department,
                mainDisciplines,
                additionalDisciplines,
            });

            if (result.success) {
                setName("");
                setSelectedDepartment("");
                setMainDisciplines([]);
                setAdditionalDisciplines([]);
                setMainDisciplineInput("");
                setAdditionalDisciplineInput("");
                onClose();
            } else {
                setError(result.message || "Произошла ошибка");
            }
        });
    };

    if (!isOpen) return null;

     return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div
                className="absolute inset-0"
                onClick={onClose}
            />

            <div className="relative bg-secondary rounded-[10px] p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">
                        Добавление преподавателя
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* ФИО */}
                    <div>
                        <label className="block text-gray-700 text-lg mb-2">
                            ФИО
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="ФИО..."
                            className="bg-white w-full rounded-md p-2.5 h-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Кафедра */}
                    <div>
                        <label className="block text-gray-700 text-lg mb-2">
                            Кафедра
                        </label>
                        <Select
                            value={selectedDepartment}
                            onValueChange={setSelectedDepartment}
                        >
                            <SelectTrigger className="bg-white w-full h-10!">
                                <SelectValue placeholder="Кафедра..." />
                            </SelectTrigger>
                            <SelectContent>
                                {DEPARTMENT_LIST.map((dept) => (
                                    <SelectItem key={dept} value={dept}>
                                        {dept}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-lg mb-2">
                            Основные дисциплины
                        </label>
                        <div className="flex gap-2 mb-2">
                            <Select
                                value={mainDisciplineInput}
                                onValueChange={setMainDisciplineInput}
                            >
                                <SelectTrigger className="bg-white w-full h-10!">
                                    <SelectValue placeholder="Дисциплина..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {disciplines.map((disc) => (
                                        <SelectItem key={disc.id} value={disc.id}>
                                            {disc.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button
                                type="button"
                                onClick={handleAddMainDiscipline}
                                className="h-10 px-4"
                            >
                                Добавить
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {mainDisciplines.map((discId) => {
                                const disc = disciplines.find(d => d.id === discId);
                                return disc ? (
                                    <span
                                        key={discId}
                                        className="inline-flex items-center gap-1 bg-card text-primary px-3 py-1 rounded-md"
                                    >
                                        {disc.name}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveMainDiscipline(discId)
                                            }
                                            className="hover:text-blue-900"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </span>
                                ) : null;
                            })}
                        </div>
                    </div>

                    {/* Дополнительные дисциплины - ТЕПЕРЬ ПЕРЕДАЁМ ID */}
                    <div>
                        <label className="block text-gray-700 text-lg mb-2">
                            Дополнительные дисциплины
                        </label>
                        <div className="flex gap-2 mb-2">
                            <Select
                                value={additionalDisciplineInput}
                                onValueChange={setAdditionalDisciplineInput}
                            >
                                <SelectTrigger className="bg-white w-full h-10!">
                                    <SelectValue placeholder="Дисциплина..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {disciplines.map((disc) => (
                                        <SelectItem key={disc.id} value={disc.id}>
                                            {disc.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button
                                type="button"
                                onClick={handleAddAdditionalDiscipline}
                                className="h-10 px-4"
                            >
                                Добавить
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {additionalDisciplines.map((discId) => {
                                const disc = disciplines.find(d => d.id === discId);
                                return disc ? (
                                    <span
                                        key={discId}
                                        className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-md"
                                    >
                                        {disc.name}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveAdditionalDiscipline(
                                                    discId
                                                )
                                            }
                                            className="hover:text-green-900"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </span>
                                ) : null;
                            })}
                        </div>
                    </div>


                    {/* Кнопки */}
                    <div className="flex justify-center pt-4">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-md font-medium disabled:opacity-50"
                        >
                            {isPending ? "Добавление..." : "Добавить"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}