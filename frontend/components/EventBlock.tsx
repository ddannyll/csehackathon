import { fetchEventDetails } from '@/util/fetchers'
import { applyFn } from '@/util/helpers'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import Tag from './Tag'

interface EventBlockProps {
    eventId: string
    owned: boolean
    editEvent?: () => void
}

export default function EventBlock({eventId, owned, editEvent}: EventBlockProps) {
    const {data} = useSWR([fetchEventDetails, {eventId}],
        applyFn<Parameters<typeof fetchEventDetails>, ReturnType<typeof fetchEventDetails>>
    )

    if (data) {
        const {eventName, date, description, tags, location, members, img} = data
        return <div className="w-full rounded border bg-zinc-100 text-lg flex flex-col relative">
            <div className="h-32 relative overflow-hidden group">
                <Link href={`/event/${eventId}`} className=''>
                    <Image src={img || '/placehold.png'} alt={'event image'} width={200} height={200}
                        className='w-full h-full brightness-50 transition group-hover:scale-105 group-hover:brightness-[60%]'
                    />
                    <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-white font-bold text-center">
                        <h2 className="z-10">
                            {eventName}
                        </h2>
                        <h3 className='px-2 pb-2 text-sm z-10'>{dayjs(date).format('MMMM D, YYYY')}</h3>
                    </div>
                </Link>
            </div>
            <div className="text-sm text-zinc-500 bg-zinc-200">
                <div className="flex justify-between items-center">
                    <span className='p-2'>4/5</span>
                    {owned &&
                        <button className='p-2 z-10 hover:text-zinc-900' onClick={editEvent}>
                            Edit
                        </button>
                    }
                </div>
                <div className="flex gap-2 p-2 overflow-x-scroll scrollbar-thin scrollbar-thumb-zinc-500">
                    {tags.map(tag => <Tag name={tag} key={tag} className='bg-zinc-300'/>)}
                </div>
            </div>
        </div>
    }
}
