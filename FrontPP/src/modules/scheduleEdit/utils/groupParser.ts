export interface ParsedGroupName {
    prefix: string
    number: string
}

export function parseGroupName(name: string): ParsedGroupName {
    const parts = name.split('-')
    
    if (parts.length < 2) {
        return { prefix: name, number: '' }
    }

    const prefix = parts[0]
    const number = parts.slice(1).join('-')

    return { prefix, number }
}