interface TagProps {
    name: string
    highlight?: boolean
}

export default function Tag ({name}: TagProps) {
    return <span
        className="rounded-full bg-zinc-200 text-zinc-600 text-sm w-fit py-1 px-2 min-w-[70px] flex justify-center"
    >
        {name}
    </span>
}
