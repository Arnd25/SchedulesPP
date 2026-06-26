import { api } from '@/config/http/server.http'
import EditPage from './editPage'
import { Group, Schedule, Pair } from './models'
import { API_ROUTES } from '@/shared/routes/api.route'

type ApiResponse<T> = T[] | { data: T[] | T | null; error?: string | null }

const extractData = <T,>(response: ApiResponse<T>): T[] => {
    if (Array.isArray(response)) return response
    if (response && typeof response === 'object' && 'data' in response) {
        const data = (response as { data: unknown }).data
        if (Array.isArray(data)) return data as T[]
    }
    return []
}

export default async function ScheduleEditPage() {
    const [groupsResult, schedulesResult, pairsResult] = await Promise.all([
        api.get<Group[]>(API_ROUTES.group.ALL()),
        api.get<Schedule[]>(API_ROUTES.schedules.ALL()),
        api.get<Pair[]>(API_ROUTES.pairs.ALL()),
    ])

    const groups = extractData<Group>(groupsResult.data ?? groupsResult as unknown as ApiResponse<Group>)
    const schedules = extractData<Schedule>(schedulesResult.data ?? schedulesResult as unknown as ApiResponse<Schedule>)
    const pairs = extractData<Pair>(pairsResult.data ?? pairsResult as unknown as ApiResponse<Pair>)

    return <EditPage groups={groups} schedules={schedules} pairs={pairs} />
}