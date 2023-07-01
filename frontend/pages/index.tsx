import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './_app'
import useSWR from 'swr'
import { fetchFeed } from '@/util/fetchers'
import { applyFn } from '@/util/helpers'
import EventBlock from '@/components/EventBlock'
import FeedEvent from '@/components/FeedEvent'

export default function Swipe() {
    const {authUser} = useContext(AuthContext)
    const router = useRouter()
    const [currIndex, setCurrIndex] = useState(0)

    const {data: feedData} = useSWR([fetchFeed, {userId: authUser?.userId}],
        applyFn<Parameters<typeof fetchFeed>, ReturnType<typeof fetchFeed>>
    )

    useEffect(() => {
        if (feedData && currIndex !== 0 && feedData.length <= currIndex) {
            setCurrIndex(0)
        }
    }, [feedData, currIndex])

    if (feedData && feedData[currIndex]) {
        return <div className='w-full h-full'>
            <FeedEvent
                onInterested={() => {
                    setCurrIndex(currIndex + 1)
                }}
                onUninterested={() => {
                    setCurrIndex(currIndex + 1)
                }}
                eventId={feedData[currIndex].event_id}/>
        </div>

    }
    return <>
        Loading...
    </>

}
