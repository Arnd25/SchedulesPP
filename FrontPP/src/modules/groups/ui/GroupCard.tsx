import { Button } from "@/components/ui/button"
import { Group } from "../models"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { XIcon } from "lucide-react"
import { DeleteGroup } from "../actions/DeleteGroup"
interface Props {
    group: Group
}
export default function GroupCard({ group }: Props) {
    return (
        <div className="p-5 bg-card flex gap-2.5 items-center rounded-lg text-2xl font-semibold relative">
            <div className="">
                <p>{group.name}</p>
                <p className="text-gray-500 font-medium text-lg ">{group.department}</p>
            </div>
            <AlertDialog>
                <AlertDialogTrigger className="bg-transparent! border-0! p-0! absolute top-0 right-2" asChild>
                    <Button variant="outline"><XIcon className="w-5! h-5! " /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Это действие удалить группу {group.name} без возможность востановления
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="p-0 px-5 text-lg! h-full">Отмена</AlertDialogCancel>
                        <form className="" action={DeleteGroup}>
                            <input type="hidden" name="id" value={group.id} />
                            <Button
                                type="submit"
                                className=" h-fit  w-fit p-0 text-lg px-5 py-1.5 hover:cursor-pointer">
                                Удалить
                            </Button>
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
