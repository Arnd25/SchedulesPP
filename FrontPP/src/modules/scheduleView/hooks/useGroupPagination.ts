import * as React from 'react'
import { Group } from '../models'
import { GROUPS_PER_PAGE } from '../constants/schedule.constants'

export function useGroupPagination(groups: Group[] = []) {
    const safeGroups = groups ?? []
    const [currentPage, setCurrentPage] = React.useState(1)

    const totalPages = Math.ceil(safeGroups.length / GROUPS_PER_PAGE)

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    const currentGroups = safeGroups.slice(
        (currentPage - 1) * GROUPS_PER_PAGE,
        currentPage * GROUPS_PER_PAGE
    )

    return {
        currentPage,
        totalPages,
        currentGroups,
        setCurrentPage,
        goToPrevPage,
        goToNextPage,
    }
}
