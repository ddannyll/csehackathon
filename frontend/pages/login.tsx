import Link from 'next/link'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthContext } from './_app'
import { useRouter } from 'next/router'
import Image from 'next/image'

type LoginInputs = {
    username: string
    password: string
}

const labelClasses = 'font-bold text-sm mt-2 flex'
const inputClasses = 'p-2 w-full rounded bg-gray-100'
const RequiredStar = () => (<div className="text-red-500 inline text-xs pl-1">*</div>)

export default function Login() {
    const router = useRouter()
    const {authUser, setAuthUser} = useContext(AuthContext)
    const { register, handleSubmit, formState: {errors} } = useForm<LoginInputs>()

    const onSubmit: SubmitHandler<LoginInputs> = data => {
        console.log(data)
        // TODO REPLACE WITH BACKEND REQ
        if (data.username === 'd' && data.password === 'd' && setAuthUser) {
            setAuthUser({token: 'd', userId: 'd'})
            router.push('/')
        }
    }

    return (
        <div
            className="w-screen h-screen flex justify-center items-center relative">
            <Image
                src={'redWave.svg'}
                alt='background wave' width={1920} height={1080}
                className='absolute -z-10 object-cover w-full h-full'
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="shadow-md max-w-md w-full flex flex-col gap-2 p-6 rounded bg-white">
                <h1
                    className=" text-xl font-medium text-center">
                    Login To TravelMates
                </h1>

                <label htmlFor="username" className={labelClasses}>
                    USERNAME
                    <RequiredStar />
                    {errors.username &&
                    <span className='text-red-500 font-normal grow text-end'>
                        Username is required
                    </span>
                    }
                </label>
                <input id="username" type="text" className={inputClasses} {...register('username', {required: true})}/>

                <label htmlFor="password" className={labelClasses}>
                    PASSWORD
                    <RequiredStar />
                    {errors.password &&
                    <span className='text-red-500 font-normal grow text-end'>
                        Password is required
                    </span>
                    }
                </label>
                <input id="password" type="password" className={inputClasses} {...register('password', {required: true})}/>

                <button
                    className="bg-red-400 text-red-50 p-2 rounded mt-5 hover:bg-red-500 active:bg-red-600 transition"
                >
                        Log In
                </button>
                <p className="text-sm">
                    Need an account?
                    <Link href={'/register'} className="text-red-400 hover:underline px-1">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    )
}
