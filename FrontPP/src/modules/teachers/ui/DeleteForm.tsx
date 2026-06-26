'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { DeleteTeacher } from '../actions/DeleteTeacher';

interface TeacherDeleteFormProps {
    isOpen: boolean;
    onClose: () => void;
    teacherId: string;
    teacherName: string;
}

export function TeacherDeleteForm({
    isOpen,
    onClose,
    teacherId,
    teacherName,
}: TeacherDeleteFormProps) {
    const [isDeleting, startDeleteTransition] = useTransition();

    if (!isOpen) return null;

    const handleDelete = () => {
        startDeleteTransition(async () => {
            const result = await DeleteTeacher(teacherId);

            if (result.success) {
                onClose();
            } else {
                console.error(result.message);
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative bg-white rounded-[10px] p-6 w-full max-w-md shadow-xl">
                <h3 className="text-xl font-semibold mb-4">
                    Подтверждение удаления
                </h3>
                <p className="text-gray-600 mb-6">
                    Вы уверены, что хотите удалить преподавателя{' '}
                    <strong>{teacherName}</strong>? Это действие нельзя отменить.
                </p>
                <div className="flex gap-3">
                    <Button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                    >
                        {isDeleting ? 'Удаление...' : 'Удалить'}
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="flex-1"
                        disabled={isDeleting}
                    >
                        Отмена
                    </Button>
                </div>
            </div>
        </div>
    );
}