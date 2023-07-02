import { fetchEventDetails, fetchUserDetails } from '@/util/fetchers'
import { applyFn } from '@/util/helpers'
import Image from 'next/image'
import useSWR from 'swr'
import Tag from './Tag'
import dayjs from 'dayjs'
import Link from 'next/link'

interface FeedEventProps {
    eventId: string
    className?: string
    onInterested: () => void
    onUninterested: () => void
}


export default function FeedEvent({eventId, className, onInterested, onUninterested}: FeedEventProps) {
    const {data} = useSWR([fetchEventDetails, {eventId}],
        applyFn<Parameters<typeof fetchEventDetails>, ReturnType<typeof fetchEventDetails>>
    )
    const {data: userDetails} = useSWR([fetchUserDetails, {userId: data?.hostId}],
        applyFn<Parameters<typeof fetchUserDetails>, ReturnType<typeof fetchUserDetails>>
    )

    if (data) {
        const {eventName, date, description, tags, location, members, img, hostId} = data
        return <div className='py-10 h-full overflow-y-scroll pb-32 scrollbar-none'>
            <div className="shadow max-w-lg mx-auto rounded-lg bg-zinc-100">
                <Image src={img || '/placehold.png'} width={500} height={300} alt='event image'
                    className='w-full aspect-[5/3]'
                />
                <h1 className='text-2xl px-6 pt-6 pb-4 text-zinc-800 font-bold'>{eventName}</h1>
                <div className="flex justify-between items-center px-4">
                    <Link className="flex gap-2 items-center" href={`/profile/${data.hostId}`}>
                        <Image src={userDetails?.picture || '/placehold.png'} width={50} height={50} alt={'profile photo'}
                            className='aspect-square rounded-full'/>
                        <h3 className='text-zinc-400 '>{`Hosted by ${userDetails?.username}`}</h3>
                    </Link>
                    <p className='text-zinc-400'>{dayjs(date).format('MMMM D, YYYY')}</p>
                </div>
                <div className="flex flex-wrap gap-2 px-4 py-5">
                    {tags.map(tag => <Tag key={tag} name={tag}/>)}
                    <Tag name={location} />
                </div>
                <div className="px-6 mb-4 flex flex-col gap-1">
                    <h3 className=''>Event Description</h3>
                    <p className='text-zinc-500'>{description}</p>
                </div>
                <div className="grid grid-cols-2 p-3">
                    <button
                        onClick={onUninterested}
                        className='p-2 text-zinc-500 transition hover:text-zinc-900'>
                            Not Interested
                    </button>
                    <button
                        onClick={onInterested}
                        className='p-2 bg-red-400 rounded text-red-50 hover:bg-red-500 transition'>
                            Interested
                    </button>
                </div>
            </div>
        </div>

    }
    return <>
        Loading
    </>
}
