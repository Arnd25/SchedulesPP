import { api } from '@/config/http/server.http'
import { API_ROUTES } from '@/shared/routes/api.route'
import ScheduleEditPage from '@/modules/scheduleEdit/ScheduleEditPage'
import { Group, Schedule } from '@/modules/scheduleEdit/models'

export default async function EditSchedulePage() {
    return (
        <div className="p-6 bg-gray-50">
            <ScheduleEditPage />
        </div>
    )

}