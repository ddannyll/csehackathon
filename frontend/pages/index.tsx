import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { AuthContext } from './_app'
import useSWR from 'swr'

export default function Swipe() {
    const {authUser} = useContext(AuthContext)
    const router = useRouter()
    const [currIndex] = useState(0)
    const [feedList, setFeedList] = useState()

    // const {data: feedData} = useSWR()


    return <div>
        hello world
    </div>
}
