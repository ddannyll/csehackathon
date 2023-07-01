import { useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '@/pages/_app';
import { useRouter } from 'next/router';
import NavigationBar from './NavigationBar';
import Image from 'next/image';

const layoutBlacklist = [
    '/login',
    '/register',
]

export default function Layout({children} : {children?: React.ReactNode}) {
    const {authUser} = useContext(AuthContext)
    const router = useRouter()
    useEffect(() => {
        if (!authUser?.token && router.pathname !== '/login' && router.pathname !== '/register') {
            router.push('/login')
        }
    }, [authUser?.token, router])

    const selectedTab = useMemo(() => {
        if (router.pathname === '/') {
            return 'swipe'
        } else if (router.pathname.includes('/events')) {
            return 'events'
        } else if (router.pathname.includes('/profile')) {
            return 'profile'
        }
    }, [router.pathname])

    if (layoutBlacklist.includes(router.pathname)) {
        return <>{children}</>
    }



    return <div className='w-screen h-screen relative'>
        <Image
            src={'/redWave.svg'}
            alt='background wave' width={1920} height={1080}
            className='-z-10 absolute object-cover w-screen h-screen'
        />
        {children}
        <NavigationBar className='absolute bottom-0 left-1/2 -translate-x-1/2' selectedTab={selectedTab}/>
    </div>
}
