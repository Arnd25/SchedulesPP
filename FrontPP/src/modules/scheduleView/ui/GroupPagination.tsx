import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface Props {
    currentPage: number
    totalPages: number
    onPrevPage: () => void
    onNextPage: () => void
    onPageSelect: (page: number) => void
}

export default function GroupPagination({
    currentPage,
    totalPages,
    onPrevPage,
    onNextPage,
    onPageSelect,
}: Props) {
    return (
        <div className="flex items-center justify-center gap-3 mb-6">
            <button
                onClick={onPrevPage}
                disabled={currentPage === 1}
                className="text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-2"
            >
                <FiChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageSelect(page)}
                        className={`w-10 h-10 rounded-full font-semibold transition-all shadow-sm ${
                            currentPage === page
                                ? 'bg-primary text-white shadow-lg scale-110'
                                : 'bg-white'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={onNextPage}
                disabled={currentPage === totalPages}
                className="text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-2"
            >
                <FiChevronRight className="h-6 w-6" />
            </button>
        </div>
    )
}
