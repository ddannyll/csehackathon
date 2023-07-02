import { useForm } from 'react-hook-form'
import { ModTags } from './ModTags'
import { fetchEventDetails } from '@/util/fetchers'
import { applyFn } from '@/util/helpers'
import useSWR from 'swr'

type EditEventInputs = {
    description: string
    image: string
    date: string
}


interface EditEventProps {
    close: () => void
    eventId: string
}

export default function EditEventForm({close, eventId}: EditEventProps) {
    const { register, handleSubmit, formState } = useForm<EditEventInputs>()

    const {data} = useSWR([fetchEventDetails, {eventId}],
        applyFn<Parameters<typeof fetchEventDetails>, ReturnType<typeof fetchEventDetails>>
    )

    const onSubmit = () => {
        console.log(formState)
    }

    if (data) {
        return <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
            <label htmlFor="eventName" className='font-bold py-2'>EVENT NAME</label>
            <input id="eventName" type='text' className='p-4 mb-2'/>
            <label htmlFor="description" className='font-bold py-2'>DESCRIPTION</label>
            <textarea id="description" className='p-4 mb-2'/>
            <label htmlFor="date" className='font-bold py-2 flex'>DATE</label>
            <input id="date" type="date" className='p-4 mb-2'/>
            <label htmlFor="date" className='font-bold py-2 flex'>PICTURE URL</label>
            <input id="pic" type="text" className='p-4 mb-5'/>
            <ModTags tags={data.tags} deleteTag={() => {}} addTag={() => {}}/>
            <div className="flex justify-end gap-5">
                <button className="py-3 px-5 text-zinc-600  transition hover:text-zinc-900"
                    onClick={close}
                >Cancel</button>
                <button className='py-3 px-5 bg-zinc-700 text-zinc-50 hover:bg-zinc-800 transition'
                    onClick={close}
                >
                Submit
                </button>
            </div>
        </form>
    }
    return <>Loading...</>
}
