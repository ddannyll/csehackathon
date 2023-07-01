import { useContext, useMemo } from 'react'
import { AuthContext } from '../_app'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Tag from '@/components/tag'
import EventBlock from '@/components/EventBlock'
import useSWR from 'swr'
import {applyFn} from '@/util/helpers'
import { fetchUserDetails } from '@/util/fetchers'

export default function Profile() {
    const {authUser} = useContext(AuthContext)
    const router = useRouter()
    const ownProfile = useMemo(() => authUser?.userId === router.query.id, [router, authUser])

    const {data: userDetails} = useSWR(
        [fetchUserDetails, {userId: router.query.id}],
        applyFn<Parameters<typeof fetchUserDetails>, ReturnType<typeof fetchUserDetails>>
    )


    if (userDetails) {
        const {username, bio, tags, picture, hosted_events} = userDetails
        return <div className='h-full max-w-lg mx-auto overflow-y-scroll scrollbar-none'>
            <div className='bg-zinc-100 shadow flex flex-col mt-10 mb-32 rounded-xl overflow-hidden'>
                <Image
                    src={'/placehold.png'}
                    alt={'profile pic'}
                    width={500}
                    height={500}
                    className='w-full object-cover'
                />
                <div className="flex flex-col gap-4 px-6 py-4">
                    <h2 className='text-2xl text-center grow'>
                        {username}
                    </h2>
                    <div className='flex justify-center flex-wrap gap-2'>
                        {tags.map(tag => <Tag name={tag} key={tag}/>)}
                    </div>
                    {ownProfile &&
                    <div className="flex justify-center gap-6">
                        <button className="self-center place-self-end px-4 py-1 rounded border-red-400 border text-red-400 hover:bg-red-50">
                            Edit Profile
                        </button>
                        <button className="self-center place-self-end px-4 py-1 rounded bg-red-400 border text-red-50 hover:bg-red-500">
                            New Event
                        </button>
                    </div>
                    }
                    <div className="flex flex-col">
                        <h3 className='text-md'>About Me</h3>
                        <p className='font-light text-zinc-600'>
                            {bio}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className='text-md'>Events</h3>
                        <div className="grid grid-cols-2 w-full gap-3">
                            {hosted_events.map(eventId => <EventBlock eventId={eventId} key={eventId} owned={true}/>)}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    } else {
        return <>Loading...</>
    }



}
