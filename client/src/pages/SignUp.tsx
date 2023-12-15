import { Link } from 'react-router-dom'
import Button from '../component/Button';
import { useForm as useReactForm, SubmitHandler } from 'react-hook-form'
import { SignUpSchema, signUpType } from '../hookes/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import instance from '../hookes/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../component/toast';
import { VisibilitySharp, VisibilityOffSharp } from '@mui/icons-material'
import { useState } from 'react';


export default function SignUp() {
    const navigate = useNavigate()
    const [passwordType, setPasswordType] = useState('password')
    const { register, handleSubmit, formState: { errors } } = useReactForm<signUpType>({
        resolver: zodResolver(SignUpSchema)
    })
    const mutation = useMutation({
        mutationFn: (data: signUpType) => {
            return instance.post(`/register`, data)
        },
        onSuccess: () => {
            toast.success(`signup successful`)
            navigate(`/login`)
        },
        onError: (error) => {
            toast.error(`authentication error, ${error.message}`)
        }
    })
    const onSubmit: SubmitHandler<signUpType> = (data) => {
        mutation.mutate(data)
    }
    return (
        <main id='sign-up'
            className='bg-blue-800 max-w-screen min-h-screen flex flex-col justify-center align-middle text-center'>
            <article className='container px-4 mx-auto relative '>
                <article className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-white rounded-lg border-2 border-white shadow-lg sm:p-5 sm:w-2/4 '>
                    {mutation.isPending ? <LoadingSpinner /> : null}
                    <section>
                        <h3 className='mb-2 font-extrabold'>
                            Welcome Onboard
                        </h3>
                        <p>
                            lets help you meet up your tasks
                        </p>
                    </section>
                    <section className='mt-2 mb-2'>
                        <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                            <div className=''>
                                <input
                                    type='text'
                                    placeholder="Enter your name"
                                    {...register('name')}
                                    className='rounded-xl w-64 mt-2 p-4 border-2 outline-none bg-gray-300 sm:w-64' />
                                {errors.name && <p className='text-red-800'>{errors.name.message}</p>}
                            </div>
                            <div className=''>
                                <input
                                    type='email'
                                    placeholder="Enter your email"
                                    {...register('email')}
                                    className='rounded-xl w-64 mt-2 p-4 border-2 outline-none bg-gray-300 sm:w-64' />
                                {errors.email && <p className='text-red-800'>{errors.email.message}</p>}
                            </div>
                            <div className='relative'>
                                <input
                                    type={passwordType}
                                    placeholder="Enter a strong password"
                                    {...register('password')}
                                    className='rounded-xl w-64 mt-2 p-4 border-2 outline-none bg-gray-300 sm:w-64' />
                                <span
                                    className='absolute right-1 top-1/3 sm:right-5 md:right-12 lg:right-32 xl:right-1/3 '>
                                    {passwordType === 'password' ? (
                                        < VisibilitySharp onClick={() => setPasswordType('text')} />
                                    ) : (
                                        <VisibilityOffSharp onClick={() => setPasswordType('password')} />
                                    )}
                                </span>
                            </div>
                            {errors.password && <p className='text-red-800'>{errors.password.message}</p>}

                            <section>
                                <Button type='submit' disabled={mutation.isPending}>
                                    Sign Up
                                </Button>
                            </section>
                        </form>
                    </section>
                    <section>
                        <p>
                            Already have an account? <Link to='/login' className='text-blue-600'>Sign In</Link>
                        </p>
                    </section>
                </article>
            </article>
        </main>
    );
}
