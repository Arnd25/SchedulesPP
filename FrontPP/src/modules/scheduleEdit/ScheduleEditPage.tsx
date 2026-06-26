
import { api } from '@/config/http/server.http'
import EditPage from './editPage'
import { Group, Schedule, Pair } from './models'
import { API_ROUTES } from '@/shared/routes/api.route'

export default async function ScheduleEditPage() {
    const [groupsResult, schedulesResult, pairsResult] = await Promise.all([
        api.get(API_ROUTES.group.ALL()),
        api.get(API_ROUTES.schedules.ALL()),
        api.get(API_ROUTES.pairs.ALL()),
    ])

    const extractData = <T,>(response: any): T[] => {
        if (Array.isArray(response)) return response as T[]
        if (response?.data && Array.isArray(response.data)) return response.data as T[]
        return []
    }

    const groups = extractData<Group>(groupsResult)
    const schedules = extractData<Schedule>(schedulesResult)
    const pairs = extractData<Pair>(pairsResult)

    return <EditPage groups={groups} schedules={schedules} pairs={pairs} />
}