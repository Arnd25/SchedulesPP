'use client';

import { useEffect, useState, useTransition } from 'react';
import { X } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Discipline, Teacher } from '../models';
import { Department, DEPARTMENT_LIST } from '@/shared/types/department.enum';
import { UpdateTeacher } from '../actions/updateTacher';
import { useRouter } from 'next/navigation';

interface TeacherEditFormProps {
    isOpen: boolean;
    onClose: () => void;
    teacher: Teacher;
    disciplines: Discipline[];
}

export function TeacherEditModal({
    isOpen,
    onClose,
    teacher,
    disciplines,
}: TeacherEditFormProps) {
    const router = useRouter();
    const [isUpdating, startUpdateTransition] = useTransition();
    const [editName, setEditName] = useState(teacher.name);
    const [editDepartment, setEditDepartment] = useState<string>(teacher.department);
    const [editMainDisciplines, setEditMainDisciplines] = useState<string[]>(
        teacher.mainDisciplines.map((d) => d.id)
    );
    const [editAdditionalDisciplines, setEditAdditionalDisciplines] = useState<string[]>(
        teacher.additionalDisciplines.map((d) => d.id)
    );
    const [mainDisciplineInput, setMainDisciplineInput] = useState('');
    const [additionalDisciplineInput, setAdditionalDisciplineInput] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setEditName(teacher.name);
            setEditDepartment(teacher.department);
            setEditMainDisciplines(teacher.mainDisciplines.map((d) => d.id));
            setEditAdditionalDisciplines(teacher.additionalDisciplines.map((d) => d.id));
            setMainDisciplineInput('');
            setAdditionalDisciplineInput('');
            setError('');
        }
    }, [isOpen, teacher]);

    if (!isOpen) return null;

    const handleAddMainDiscipline = () => {
        if (
            mainDisciplineInput &&
            !editMainDisciplines.includes(mainDisciplineInput)
        ) {
            setEditMainDisciplines([...editMainDisciplines, mainDisciplineInput]);
            setMainDisciplineInput('');
        }
    };

    const handleRemoveMainDiscipline = (id: string) => {
        setEditMainDisciplines(editMainDisciplines.filter((d) => d !== id));
    };

    const handleAddAdditionalDiscipline = () => {
        if (
            additionalDisciplineInput &&
            !editAdditionalDisciplines.includes(additionalDisciplineInput)
        ) {
            setEditAdditionalDisciplines([
                ...editAdditionalDisciplines,
                additionalDisciplineInput,
            ]);
            setAdditionalDisciplineInput('');
        }
    };

    const handleRemoveAdditionalDiscipline = (id: string) => {
        setEditAdditionalDisciplines(
            editAdditionalDisciplines.filter((d) => d !== id)
        );
    };

    const handleClose = () => {
        setMainDisciplineInput('');
        setAdditionalDisciplineInput('');
        setError('');
        onClose();
    };

    const handleUpdate = () => {
        setError('');

        if (!editName.trim()) {
            setError('Введите ФИО преподавателя');
            return;
        }

        if (!editDepartment) {
            setError('Выберите кафедру');
            return;
        }

        startUpdateTransition(async () => {
            const result = await UpdateTeacher({
                id: teacher.id,
                name: editName,
                department: editDepartment as Department,
                mainDisciplines: editMainDisciplines,
                additionalDisciplines: editAdditionalDisciplines,
            });

            if (result.success) {
                handleClose();
                router.refresh();
            } else {
                setError(result.message || 'Произошла ошибка');
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="absolute inset-0" onClick={handleClose} />
            <div className="relative bg-white rounded-[10px] p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">
                        Редактирование преподавателя
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-5">
                    {/* ФИО */}
                    <div>
                        <label className="block text-gray-700 text-lg mb-2">ФИО</label>
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="ФИО..."
                            className="bg-white w-full rounded-md p-2.5 h-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-lg mb-2">Кафедра</label>
                        <Select value={editDepartment} onValueChange={setEditDepartment}>
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
                                className="h-10 px-4"   >
                                Добавить
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {editMainDisciplines.map((discId) => {
                                const disc = disciplines.find((d) => d.id === discId);
                                return disc ? (
                                    <div
                                        key={discId}
                                        className="inline-flex items-center gap-1 bg-card text-primary px-3 py-1 rounded-md">
                                        {disc.name}
                                        <button type="button" onClick={() => handleRemoveMainDiscipline(discId)}>
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-lg mb-2">
                            Дополнительные дисциплины
                        </label>
                        <div className="flex gap-2 mb-2">
                            <Select value={additionalDisciplineInput} onValueChange={setAdditionalDisciplineInput}>
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
                            {editAdditionalDisciplines.map((discId) => {
                                const disc = disciplines.find((d) => d.id === discId);
                                return disc ? (
                                    <span
                                        key={discId}
                                        className="inline-flex items-center gap-1 bg-card text-primary px-3 py-1 rounded-md"
                                    >
                                        {disc.name}
                                        <button type="button" onClick={() => handleRemoveAdditionalDiscipline(discId)}>
                                            <X className="w-4 h-4" />
                                        </button>
                                    </span>
                                ) : null;
                            })}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleUpdate}
                            disabled={isUpdating}
                            className="flex-1 bg-primary hover:bg-primary/90 text-white py-5 rounded-md font-medium disabled:opacity-50">
                            {isUpdating ? 'Сохранение...' : 'Сохранить'}
                        </Button>
                        <Button
                            onClick={handleClose}
                            variant="outline"
                            className="flex-1 py-5 hover:bg-gray-200"
                            disabled={isUpdating}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}