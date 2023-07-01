import { useContext, useEffect } from 'react';
import { AuthContext } from '@/pages/_app';
import { useRouter } from 'next/router';

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

    if (layoutBlacklist.includes(router.pathname)) {
        return <>{children}</>
    }

    return <div>
        <p>
            layout
        </p>
        {children}
    </div>
}
