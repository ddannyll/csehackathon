import { useForm } from 'react-hook-form'
import { ModTags } from './ModTags'

type EditProfileInputs = {
    bio: string
    pic: string
}


interface EditProfileProps {
    initialTags: string[]
    initialBio: string
    initialImage: string
    close: () => void
}

export default function EditProfile({initialTags, initialBio, initialImage, close}: EditProfileProps) {
    const { register, handleSubmit, formState } = useForm<EditProfileInputs>()

    const onSubmit = () => {
        console.log(formState)
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="bio" className='text-zinc-900 font-bold'>ABOUT ME</label>
        <textarea id="bio" {...register('bio')} className='w-full my-2 mb-4 p-4' defaultValue={initialBio}/>
        <label htmlFor="bio" className='text-zinc-900 font-bold'>IMAGE URL</label>
        <input id="pic" {...register('pic')} className='w-full my-2 mb-4 p-4' defaultValue={initialImage}/>
        <ModTags tags={initialTags} addTag={() => {}} deleteTag={() => {}}/>
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
