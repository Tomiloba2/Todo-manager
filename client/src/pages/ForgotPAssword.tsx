import Button from '../component/Button';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form'
import { forgotPasswordSchema, forgotPasswordType } from '../hookes/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingSpinner from '../component/toast';
import { useMutation } from '@tanstack/react-query';
import instance from '../hookes/AxiosInstance';
import { toast } from 'react-toastify'


export function ForgotPassword() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<forgotPasswordType>(
        { resolver: zodResolver(forgotPasswordSchema) }
    )
    const mutation = useMutation({
        mutationFn: (data: forgotPasswordType) => {
            return instance.post(`/forgot-password`, data)
        },
        onError: (error) => {
            toast.error(`an error occured,ensure you use the email address used to signup
            ${error.message}`)
        }
    })
    const onSubmit: SubmitHandler<forgotPasswordType> = (data) => {
        mutation.mutate(data)
    }

    return (
        <div>
            <main id='sign-up'
                className='relative bg-blue-800 max-w-screen min-h-screen flex flex-col justify-center align-middle text-center'>
                <article className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-white rounded-lg border-2 border-white shadow-lg  m-auto sm:p-5 '>
                    {mutation.isPending ? <LoadingSpinner /> : (
                        <div>
                            {mutation.isSuccess ? (
                                <div className='p-4 mb-3 bg-slate-400 rounded-md text-white '>
                                    <p>
                                        A reset link has been sent to &nbsp;
                                        <a href={`mailto:${getValues(`email`)}`} className='text-green-800'>{getValues(`email`)} </a>
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    )}
                    <section>
                        <h3 className='mb-2 font-extrabold'>
                            Forgot password ?
                        </h3>
                        <p className='italic text-justify'>
                            No worries, input your email address.
                            We will send you reset instructions
                        </p>
                    </section>
                    <section className='mt-2 mb-2'>
                        <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <div className='mt-1 mb-1'>
                                    <input
                                        type='email'
                                        placeholder="Enter your email"
                                        {...register('email')}
                                        className='rounded-xl w-64 mt-8 p-4 border-2 outline-none bg-gray-300 sm:w-64' />
                                    {errors.email && <p className='text-red-800'>{errors.email.message}</p>}
                                </div>

                            </div>
                            <section>
                                <Button click={() => { }} type='submit'>
                                    Reset Password
                                </Button>
                            </section>
                        </form>
                    </section>
                    <section>
                        <Link to={`/login`} className='text-blue-700'>
                            Back to login
                        </Link>
                    </section>
                </article>
            </main>

        </div>
    );
}
