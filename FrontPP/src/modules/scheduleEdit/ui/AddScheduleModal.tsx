'use client'

import { FiX, FiSearch } from 'react-icons/fi'
import { Pair } from '../models'
import { Button } from '@base-ui/react'
import { useEffect, useState } from 'react'

interface Props {
    isOpen: boolean
    onClose: () => void
    pairs: Pair[]
    lessonNumber: number
    time: string
    onSelect: (pairId: string) => void
    isLoading?: boolean
}

export function AddScheduleModal({
    isOpen,
    onClose,
    pairs,
    lessonNumber,
    time,
    onSelect,
    isLoading = false,
}: Props) {
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (isOpen) setSearch('')
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose()
    }

    if (!isOpen) return null

    const filteredPairs = pairs.filter((pair) => {
        const query = search.toLowerCase()
        return (
            pair.discipline.name.toLowerCase().includes(query) ||
            pair.teacher.name.toLowerCase().includes(query) ||
            pair.audience.toLowerCase().includes(query) ||
            pair.group.name.toLowerCase().includes(query)
        )
    })

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs"
            onClick={handleBackdropClick}>
            <div className="bg-secondary rounded-xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-primary">
                    <div>
                        <h2 className="text-lg font-bold">
                            Добавить расписание
                        </h2>
                        <p className="text-sm text-gray-700">
                            Пара #{lessonNumber} - {time}
                        </p>
                    </div>
                    <Button
                        onClick={onClose}
                        className="p-2 rounded-lg transition-colors self-start"
                    >
                        <FiX className="w-5 h-5 text-gray-900" />
                    </Button>
                </div>
                {/* поиск */}
                <div className="p-4 border-b border-primary">
                    <div className="relative bg-white rounded-lg">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Поиск по дисциплине, преподавателю, аудитории..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                            autoFocus
                        />
                    </div>
                </div>

                <div className="p-2.5 grid grid-cols-2 overflow-y-auto">
                    {filteredPairs.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">
                            {search ? 'Ничего не найдено' : 'Нет доступных пар'}
                        </div>
                    ) : (
                        <div className="bg-card rounded-md">
                            {filteredPairs.map((pair) => (
                                <button
                                    key={pair.id}
                                    onClick={() => onSelect(pair.id)}
                                    disabled={isLoading}
                                    className="w-full p-4 rounded-md hover:bg-green-50 transition-colors text-left disabled:opacity-50"
                                >
                                    <div className="font-semibold text-lg">
                                        {pair.discipline.name}
                                    </div>
                                    <div className="flex flex-col text-sm text-gray-800">
                                        <p className=''>{pair.teacher.name}</p>
                                        <p>Аудитория: {pair.audience}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-primary">
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 bg-primary text-white font-medium rounded-lg transition-colors"
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    )
}