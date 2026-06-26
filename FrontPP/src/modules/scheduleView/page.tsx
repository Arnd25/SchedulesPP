import { api } from '@/config/http/server.http'
import { API_ROUTES } from '@/shared/routes/api.route'
import ScheduleTable from './ui/ScheduleTable'
import { Group, Schedule } from './models/index'

export default async function SchedulePage() {
    const [groupsResult, schedulesResult] = await Promise.all([
        api.get(API_ROUTES.group.ALL()),
        api.get(API_ROUTES.schedules.ALL()),
    ])

    const groups = (groupsResult.data ?? []) as Group[]
    const schedules = (schedulesResult.data ?? []) as Schedule[]

    return (
        <div className="h-full">
            <ScheduleTable 
                groups={groups} 
                schedules={schedules} 
            />
        </div>
    )
}