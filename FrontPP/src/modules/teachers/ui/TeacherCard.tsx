'use client';

import { useState, useTransition } from 'react';
import { Pencil, X, Trash2 } from 'lucide-react';
import { Discipline, Teacher } from '../models';
import { Button } from '@/components/ui/button';
import { DeleteTeacher } from '../actions/DeleteTeacher';
import { TeacherDeleteForm } from './DeleteForm';
import { TeacherEditModal } from './UpdateForm';

interface TeacherCardProps {
    teacher: Teacher;
    disciplines: Discipline[]
}

export function TeacherCard({ teacher, disciplines }: TeacherCardProps) {
    const [showMain, setShowMain] = useState(false);
    const [showAdditional, setShowAdditional] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, startDeleteTransition] = useTransition();

    const handleDelete = () => {
        startDeleteTransition(async () => {
            const result = await DeleteTeacher(teacher.id);
        });
    };

    return (
        <div className="bg-card h-fit rounded-lg p-5 relative">
            {/* Модалка редактирования */}
            <TeacherEditModal
                isOpen={showFormEdit}
                onClose={() => setShowFormEdit(false)}
                teacher={teacher}
                disciplines={disciplines}
            />

            {/* Модалка удаления */}
            <TeacherDeleteForm
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                teacherId={teacher.id}
                teacherName={teacher.name}
            />

            <div className="flex items-start justify-between">
                <h3 className="font-bold text-gray-800 text-2xl capitalize">
                    {teacher.name}
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowFormEdit(true)}
                        className="text-orange-500 hover:text-orange-700 transition-colors"
                    >
                        <Pencil fill="orange" size={18} />
                    </button>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <p className="text-xl text-gray-600">{teacher.department}</p>

            <div className="flex flex-col gap-2.5 mt-4">
                <div className="flex flex-col bg-secondary h-fit rounded-b-md">
                    <Button
                        onClick={() => setShowMain(!showMain)}
                        className="w-full bg-[#5C996C] hover:bg-primary text-white text-sm py-2 px-4 rounded transition-colors"
                    >
                        {showMain
                            ? 'Скрыть основные дисциплины'
                            : 'Показать основные дисциплины'}
                    </Button>
                    {showMain && teacher.mainDisciplines.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 p-2">
                            {teacher.mainDisciplines.map((disc) => (
                                <span
                                    key={disc.id}
                                    className="text-foreground text-lg px-3 py-1 rounded"
                                >
                                    {disc.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col bg-secondary h-fit rounded-b-md">
                    <button
                        onClick={() => setShowAdditional(!showAdditional)}
                        className="w-full bg-[#5C996C] hover:bg-primary text-white text-sm py-2 px-4 rounded transition-colors"
                    >
                        {showAdditional
                            ? 'Скрыть доп. дисциплины'
                            : 'Показать доп. дисциплины'}
                    </button>
                    {showAdditional && teacher.additionalDisciplines.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 p-2">
                            {teacher.additionalDisciplines.map((disc) => (
                                <span
                                    key={disc.id}
                                    className="text-foreground text-lg px-3 py-1"
                                >
                                    {disc.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}