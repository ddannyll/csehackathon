

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarDays, faMagnifyingGlass, faUser} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export const navigationTabs = ['events', 'swipe', 'profile']

interface NavigationBarProps {
    selectedTab?: 'events' | 'swipe' | 'profile'
    className?: string
}

export default function NavigationBar({className, selectedTab}: NavigationBarProps) {
    const unselectedClassName = 'transition-all hover:text-red-400 text-zinc-300'
    const selectedClassName = 'transition-all hover:text-red-400 text-red-400 border-b-4 px-2 border-red-400 py-2'

    return <nav
        className={`max-w-lg w-full drop-shadow-md flex justify-around items-center text-4xl rounded bg-zinc-100 p-5 h-20 ${className}`}
    >
        <Link href={'/events'} className={selectedTab === 'events' ? selectedClassName : unselectedClassName}>
            <FontAwesomeIcon icon={faCalendarDays}/>
        </Link>
        <Link href={'/'} className={selectedTab === 'swipe' ? selectedClassName : unselectedClassName}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Link>
        <Link href={'/profile'} className={selectedTab === 'profile' ? selectedClassName : unselectedClassName}>
            <FontAwesomeIcon icon={faUser} />
        </Link>
    </nav>
}

