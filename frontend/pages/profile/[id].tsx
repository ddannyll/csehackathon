import { useContext, useMemo, useState } from 'react'
import { AuthContext } from '../_app'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Tag from '@/components/Tag'
import EventBlock from '@/components/EventBlock'
import useSWR from 'swr'
import {applyFn} from '@/util/helpers'
import { fetchUserDetails } from '@/util/fetchers'
import { Dialog } from '@headlessui/react'
import EditProfileForm from '@/components/EditProfileForm'
import EditEventForm from '@/components/EditEventForm'

export default function Profile() {
    const {authUser} = useContext(AuthContext)
    const router = useRouter()
    const ownProfile = useMemo(() => authUser?.userId === router.query.id, [router, authUser])
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogForm, setDialogForm] = useState<'editProfile'|'editEvent'>()
    const [editingEvent, setEditingEvent] = useState<string>()


    const {data: userDetails} = useSWR(
        [fetchUserDetails, {userId: router.query.id}],
        applyFn<Parameters<typeof fetchUserDetails>, ReturnType<typeof fetchUserDetails>>
    )


    if (userDetails) {
        const {username, bio, tags, picture, hosted_events} = userDetails
        return <div className='h-full max-w-lg mx-auto overflow-y-scroll scrollbar-none '>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}
                className='absolute w-screen h-screen top-0 z-30 bg-black/50 flex justify-center items-center'>
                <Dialog.Panel className='max-w-xl w-full flex flex-col bg-zinc-100 p-6'>
                    <Dialog.Title className="text-2xl text-zinc-600 text-center pb-2">
                        {dialogForm === 'editProfile' ? 'Editing Profile' : 'Editing Event'}
                    </Dialog.Title>
                    {dialogForm === 'editEvent' ?
                        <EditEventForm close={() => setDialogOpen(false)} eventId={editingEvent || ''}/>
                        :
                        <EditProfileForm close={() => setDialogOpen(false)} initialBio={bio} initialTags={tags} initialImage={picture} />

                    }
                </Dialog.Panel>
            </Dialog>
            <div className='bg-zinc-100 shadow flex flex-col mt-10 mb-32 rounded-xl overflow-hidden'>
                <Image
                    src={picture || '/placehold.png'}
                    alt={'profile pic'}
                    width={500}
                    height={500}
                    className='w-full object-cover aspect-video'
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
                        <button
                            onClick={() => {setDialogForm('editProfile'); setDialogOpen(true);}}
                            className="self-center place-self-end px-4 py-1 rounded border-red-400 border text-red-400 hover:bg-red-50">
                            Edit Profile
                        </button>
                        <button
                            onClick={() => {setDialogForm('editEvent'); setDialogOpen(true);}}
                            className="self-center place-self-end px-4 py-1 rounded bg-red-400 border text-red-50 hover:bg-red-500">
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
                            {hosted_events.map(eventId => <EventBlock
                                editEvent={
                                    () => {
                                        setEditingEvent(eventId)
                                        setDialogOpen(true)
                                        setDialogForm('editEvent')
                                    }
                                }
                                eventId={eventId}
                                key={eventId}
                                owned={true}/>)}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    } else {
        return <>Loading...</>
    }



}
