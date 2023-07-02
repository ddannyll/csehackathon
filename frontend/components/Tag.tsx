interface TagProps {
    name?: string
    highlight?: boolean
    className?: string
    children?: React.ReactNode
}

export default function Tag ({name, highlight, className, children}: TagProps) {
    return <span
        className={`rounded-full bg-zinc-200 text-zinc-600 text-sm py-1 px-3 flex justify-center items-center ${className}`}
    >
        {name}
        {children}
    </span>
}
