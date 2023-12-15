import Button from '../component/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form'
import { changePasswordSchema, changePasswordType } from '../hookes/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import instance from '../hookes/AxiosInstance';
import { toast } from 'react-toastify'
import { VisibilitySharp, VisibilityOffSharp } from '@mui/icons-material'
import { useState } from 'react';


export function ChangePassword() {
    const params = useParams()
    const { id } = params
    const [passwordType, setPasswordType] = useState('password')
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<changePasswordType>({
        resolver: zodResolver(changePasswordSchema)
    })

    const mutation = useMutation({
        mutationFn: (data: { password: string, token: any }) => {
            return instance.patch(`/reset-password`, data)
        },
        onError: (error) => {
            toast.error(`${error.name} :token has expired, resend email to get a new token`)
        },
        onSuccess: () => {
            toast.success(`password reset successfully`)
            navigate(`/login`)
        }
    })
    const onSubmit: SubmitHandler<changePasswordType> = (data) => {
        mutation.mutate({ password: data.password, token: id })
    }

    return (
        <div>
            <main id='change-password'
                className='bg-blue-800 max-w-screen min-h-screen flex flex-col justify-center align-middle text-center'>
                <article className="container mx-auto px-4 relative">
                    <article className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-white rounded-lg border-2 border-white shadow-lg  m-auto sm:p-5 '>
                        <section>
                            <h3 className='mb-2 font-extrabold'>
                                Change password ?
                            </h3>
                            <p>
                                Input your new password
                            </p>
                        </section>
                        <section className='mt-2 mb-2'>
                            <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <div className='mt-1 mb-1 relative'>
                                        <input
                                            type={passwordType}
                                            placeholder="Enter a strong password"
                                            {...register('password')}
                                            className='rounded-xl w-64 mt-8 p-4 border-2 outline-none bg-gray-300 sm:w-64' />
                                        <span
                                            className='absolute right-1 top-1/2 sm:right-5 md:right-12 lg:right-32 xl:right-1/3 '>
                                            {passwordType === 'password' ? (
                                                < VisibilitySharp onClick={() => setPasswordType('text')} />
                                            ) : (
                                                <VisibilityOffSharp onClick={() => setPasswordType('password')} />
                                            )}
                                        </span>
                                    </div>
                                    {errors.password && <p className='text-red-800'>{errors.password.message}</p>}
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
                </article>
            </main>

        </div>
    );
}
