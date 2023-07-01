import { useContext, useMemo } from 'react'
import { AuthContext } from '../_app'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Profile() {
    const {authUser} = useContext(AuthContext)
    const router = useRouter()
    const ownProfile = useMemo(() => authUser?.userId === router.query.id, [router, authUser])


    return <div className='border border-red-500 flex flex-col m-auto max-w-lg'>
        <h2 className='text-2xl'>Daniel Duck</h2>
        <Image
            src={'/placehold.png'}
            alt={'profile pic'}
            width={500}
            height={500}
            className='w-full object-cover'
        />
    </div>
}
