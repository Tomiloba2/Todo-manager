import Button from '../component/Button';
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import LoadingSpinner from '../component/toast';
import { LoginSchema, LoginType } from '../hookes/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query'
import instance from '../hookes/AxiosInstance';
import { toast } from 'react-toastify';


/*export interface ISignInProps {
}*/

export default function SignIn() {
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit } = useForm<LoginType>({ resolver: zodResolver(LoginSchema) })
    const mutation = useMutation({
        mutationFn: (data: LoginType) => {
            return instance.post(`/login`, data)
        },
        onSuccess: () => {
            toast.success(`login successful`)
            navigate(`/board`)
        },
        onError: (error) => {
            toast.error(`${error.message}:invalid email or password`)
        }
    })

    const onSubmit: SubmitHandler<LoginType> = (data) => {
        mutation.mutate(data)
    }

    return (
        <main id='sign-in' className='bg-blue-800 max-w-screen min-h-screen flex flex-col justify-center align-middle text-center'>
            <article className="container mx-auto px-4 relative">
                <article className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  p-3 bg-white rounded-lg border-2 border-white shadow-lg  m-auto sm:p-5 sm:w-2/4'>
                    {mutation.isPending ? <LoadingSpinner /> : null}
                    <section className=''>
                        <h3 className='mb-2 font-extrabold'>Welcome Back</h3>
                    </section>
                    <section>
                        <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                            <div className=''>
                                <input
                                    type='email'
                                    placeholder="Enter your email"
                                    {...register('email')}
                                    className='rounded-xl w-64 mt-8 p-4 border-2 outline-none bg-gray-300 sm:w-64' />
                                {errors.email && <p className='text-red-800'>{errors.email.message}</p>}
                            </div>
                            <div className=''>
                                <input
                                    type='password'
                                    placeholder="Enter a strong password"
                                    {...register('password')}
                                    className='rounded-xl w-64 mt-8 p-4 border-2 outline-none bg-gray-300 sm:w-64' />
                                {errors.password && <p className='text-red-800'>{errors.password.message}</p>}
                            </div>

                            <section>
                                <Link to={`/forgot-password`}>
                                    <p className='text-blue-700'>forgot password</p>
                                </Link>
                            </section>
                            <section>
                                <Button type='submit' disabled={mutation.isPending}>
                                    Sign in
                                </Button>
                            </section>

                        </form>
                    </section>
                    <section>
                        <p>Don't have an account? <Link to='/signUp' className='text-blue-600'>Sign Up</Link></p>
                    </section>
                </article>

            </article>
        </main>
    );
}
