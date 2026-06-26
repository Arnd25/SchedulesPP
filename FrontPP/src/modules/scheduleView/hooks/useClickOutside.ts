import * as React from 'react'

export function useClickOutside<T extends HTMLElement>(
    ref: React.RefObject<T | null>,
    onClickOutside: () => void
): void {
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [ref, onClickOutside])
}
