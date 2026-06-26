import { BookmarkIcon } from "@/components/icons/BookmarkIcon";
import { CalendarIcon } from "@/components/icons/CalendarIcon";
import { DisciplinesIcon } from "@/components/icons/DisciplinesIcon";
import { HomeIcon } from "@/components/icons/homeIcon";
import { TeacherIcon } from "@/components/icons/TeacherIcon";
import { GroupsIcon } from "@/components/icons/GroupsIcon";
import { APP_ROUTES } from "@/shared/routes/app.route";
import { SVGProps } from "react";
import { UsersIcon } from "@/components/icons/UsersIcon";
import { ViewScheduleIcon } from "@/components/icons/ViewScheduleIcon";

export interface NavItem {
    label: string;
    href: string;
    icon: React.ComponentType<SVGProps<SVGSVGElement>>;
}
export const MENU_DATA: NavItem[] = [
    {
        label: "Главная",
        href: APP_ROUTES.dashboard(),
        icon: HomeIcon
    },
    {
        label: "Просмотр расписания",
        href: APP_ROUTES.view(),
        icon: ViewScheduleIcon
    },
    {
        label: "Редактирование расписания",
        href: APP_ROUTES.edit(),
        icon: CalendarIcon

    },
    {
        label: "Дисциплины",
        href: APP_ROUTES.discipline(),
        icon: DisciplinesIcon

    },
    {
        label: "группы",
        href: APP_ROUTES.group(),
        icon: GroupsIcon

    },
    {
        label: "Преподаватели",
        href: APP_ROUTES.teachers(),
        icon: TeacherIcon

    },
    {
        label: "Пары",
        href: APP_ROUTES.pair(),
        icon: BookmarkIcon

    },
    {
        label: "Пользователи",
        href: APP_ROUTES.users(),
        icon: UsersIcon
    },

];