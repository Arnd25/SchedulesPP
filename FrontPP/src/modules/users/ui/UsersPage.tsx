import { api } from '@/config/http/server.http'
import { API_ROUTES } from '@/shared/routes/api.route'
import UserList from './UserList'

export const UsersPage = async () => {
    const { data } = (await api.get(API_ROUTES.USERS.ALL()))
    if (!data || !Array.isArray(data)) return (<div className="">Данных нет</div>)
    return (
        <UserList users={data} />
    )
}

