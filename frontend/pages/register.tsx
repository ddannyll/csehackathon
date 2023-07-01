import Link from 'next/link'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthContext } from './_app'
import { useRouter } from 'next/router'
import Image from 'next/image'

type RegisterInputs = {
    username: string
    password: string
    confirmPassword: string
}

const labelClasses = 'font-bold text-sm mt-2 flex'
const inputClasses = 'p-2 w-full rounded bg-gray-100'
const RequiredStar = () => (<div className="text-red-500 inline text-xs pl-1">*</div>)

export default function Login() {
    const router = useRouter()
    const {authUser, setAuthUser} = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RegisterInputs>({reValidateMode: 'onChange'})

    const onSubmit: SubmitHandler<RegisterInputs> = data => {
        console.log(data)
        // TODO REPLACE WITH BACKEND REQ
        if (data.username === 'd' && data.password === 'd' && setAuthUser) {
            setAuthUser({token: 'd', user: 'd'})
            router.push('/')
        }
    }

    return (
        <div
            className="w-screen h-screen flex justify-center items-center">
            <Image
                src={'redWave.svg'}
                alt='background wave' width={1920} height={1920}
                className='absolute -z-10 object-cover w-full h-full'
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="shadow-md max-w-md w-full flex flex-col gap-2 p-6 rounded bg-white">
                <h1
                    className=" text-xl font-medium text-center">
                    Register To TravelMates
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

                <label htmlFor="password" className={labelClasses}>
                    CONFIRM PASSWORD
                    <RequiredStar />
                    {errors.confirmPassword &&
                    <span className='text-red-500 font-normal grow text-end'>
                        Passwords Must Match
                    </span>
                    }
                </label>
                <input id="confirmPassword" type="password" className={inputClasses}
                    {...register('confirmPassword',
                        {
                            required: true,
                            validate: (value, formValues) => value === formValues.password,
                        }
                    )}
                />

                <button
                    className="bg-red-400 text-red-50 p-2 rounded mt-5 hover:bg-red-500 active:bg-red-600 transition"
                >
                        Register
                </button>
                <p className="text-sm">
                    Have an account?
                    <Link href={'/login'} className="text-red-400 hover:underline px-1">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    )
}
