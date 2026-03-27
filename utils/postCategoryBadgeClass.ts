export function postCategoryBadgeClass(category: string, variant: 'overlay' | 'plain') {
    const c = category.trim().toLowerCase()
    if (c === 'акції') {
        return variant === 'overlay'
            ? 'bg-emerald-500/95 text-white ring-1 ring-white/25'
            : 'text-emerald-800 bg-emerald-50'
    }
    if (c === 'увага') {
        return variant === 'overlay'
            ? 'bg-red-600/95 text-white ring-1 ring-white/25'
            : 'text-red-800 bg-red-50'
    }
    return variant === 'overlay'
        ? 'bg-white/20 backdrop-blur-sm'
        : 'text-blue-600 bg-blue-50'
}
