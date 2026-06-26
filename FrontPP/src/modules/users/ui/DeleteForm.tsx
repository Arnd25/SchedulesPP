"use client"

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { DeleteUser } from '../actions/actions'

interface UserDeleteProps {
    isOpen: boolean
    onClose: () => void
    userId: string
    userFirstName: string
    userLastName: string
}

export default function UserDeleteForm({
    isOpen,
    onClose,
    userId,
    userFirstName,
    userLastName,
}: UserDeleteProps) {
    const [isDeleting, startDeleteTransition] = useTransition()

    const handleDelete = () => {
        startDeleteTransition(async () => {
            const result = await DeleteUser(userId)

            if (result.success) {
                onClose()
            } else {
                console.error(result.message)
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle className='text-xl'>Подтверждение удаления</DialogTitle>
                    <DialogDescription>
                        Это действие нельзя отменить. Пользователь будет удалён
                        безвозвратно.
                    </DialogDescription>
                </DialogHeader>
                <p className="text-sm ">
                    Вы уверены, что хотите удалить пользвателя{' '}
                    <strong className="text-foreground">
                        {userFirstName} {userLastName}
                    </strong>
                    ?
                </p>
                <DialogFooter className=" gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isDeleting}>
                        Отмена
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Удаление...' : 'Удалить'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}