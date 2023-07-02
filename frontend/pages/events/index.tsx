
import { fetchUserDetails } from '@/util/fetchers'
import { applyFn } from '@/util/helpers'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import useSWR from 'swr'
import { AuthContext } from '../_app'
import EventBlock from '@/components/EventBlock'

export default function Events() {
    const router = useRouter()
    const {authUser} = useContext(AuthContext)
    const {data: userDetails} = useSWR(
        [fetchUserDetails, {userId: authUser?.userId}],
        applyFn<Parameters<typeof fetchUserDetails>, ReturnType<typeof fetchUserDetails>>
    )

    if (userDetails) {
        return <div className='overflow-y-scroll h-full'>
            <div className='max-w-lg mx-auto my-20'>
                <h1 className='text-center my-10 font-bold text-lg text-zinc-500'>Joined Events</h1>
                <div className="grid grid-cols-2 gap-2">
                    {userDetails.joined_events.map(
                        (eventId) => <EventBlock owned={false} eventId={eventId} key={eventId}/>
                    )}
                </div>
            </div>
        </div>
    }
    return <>Loading...</>
}
