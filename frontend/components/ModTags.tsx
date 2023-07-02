import { Dialog } from '@headlessui/react'
import Tag from './Tag'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

interface ModTagsProps {
    tags: string[]
    deleteTag: (arg0: string) => void
    addTag: (arg0: string) => void
}

export function ModTags({tags, deleteTag, addTag}: ModTagsProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [newTagName, setNewTagName] = useState('')
    return <div className='flex gap-2'>
        {tags.map(tagName => <Tag key={tagName} className='flex gap-2'>
            {tagName}
            <button onClick={() => deleteTag(tagName)}><FontAwesomeIcon icon={faX} className='text-[11px] hover:text-red-400 p-1 -m-1'/></button>
        </Tag>)}
        <button className='bg-zinc-600 text-zinc-50 py-1 px-4 rounded-full' onClick={() => setIsOpen(true)}>+</button>
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className='absolute w-screen h-screen top-0 z-30 bg-black/50 flex justify-center items-center'
        >
            <Dialog.Panel className={'bg-zinc-100 p-4'}>
                <Dialog.Title className='mb-2'>New Tag</Dialog.Title>
                <form onSubmit={(e: React.FormEvent) => {
                    e.preventDefault()
                    console.log(newTagName)
                    addTag(newTagName)
                    setIsOpen(false)
                }} className='flex gap-2'>
                    <input type="text" className='p-2' id='newTagName' autoFocus onChange={e => setNewTagName(e.target.value)}/>
                    <button
                        className='py-2 px-5 bg-zinc-700 text-zinc-50 hover:bg-zinc-800 transition'
                    >
                        Submit
                    </button>
                </form>
            </Dialog.Panel>
        </Dialog>
    </div>
}
