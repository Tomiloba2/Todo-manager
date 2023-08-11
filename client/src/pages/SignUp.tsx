import * as React from 'react';
import { Link } from 'react-router-dom'
import InputField from '../component/InputField';
import Button from '../component/Button';
import { useForm } from '../hookes/formState';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ErrorHandler, LoadingSpinner } from '../component/AsyncState';


export default function SignUp() {
    const { inputVal, handleChange, } = useForm()
    const [loading, setLoading] = React.useState(false)
    const [err, setErr] = React.useState({ status: false, message: `` })
    const navigate = useNavigate()
    const fields = [
        {
            value: inputVal.name,
            name: 'name',
            type: 'text',
            onChange: handleChange,
            placeholder: 'Enter your full name',
            // onblur: errorHandlers.handleNameError,
            //error: inputErr.name
        },
        {
            value: inputVal.email,
            name: 'email',
            type: 'email',
            onChange: handleChange,
            placeholder: 'Enter your email',
            //onblur: errorHandlers.handleEmailError,
            //error: inputErr.email
        },
        {
            value: inputVal.password,
            name: 'password',
            type: 'password',
            onChange: handleChange,
            placeholder: 'Enter password',
            //onblur: errorHandlers.handlePasswordError,
            //error: inputErr.password
        },
    ]
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const register = async () => {
            setLoading(true)
            try {
                const res = await axios.post(`http://localhost:2000/api/register`, inputVal)
                if (res.data.message==='success') {
                    console.log(res.data);
                    navigate(`/login`)
                }
            } catch (error: any) {
                if (error?.response) {
                    console.log(error.response.data);
                    setErr({ ...err, status: true, message: `${error.response.data}` })

                } else if (error.request) {
                    console.log(error.request);
                    setErr({ ...err, status: true, message: `${error.request}` })
                } else {
                    setErr({ ...err, status: true, message: `${error.message}` })
                }
            } finally {
                setLoading(false)
            }
        }
        register()
    }
    return (
        <main id='sign-up'>
            <div>{err.status && <ErrorHandler message={err.message} />}</div>
            <div>{loading && <LoadingSpinner />}</div>
            <section>
                <h3>
                    Welcome Onboard
                </h3>
                <p>
                    lets help you meet up your tasks
                </p>
            </section>
            <section>
                <form action="" method="post">
                    {fields.map((item, id) => {
                        return (
                            <div key={id}>
                                <InputField {...item} />
                            </div>
                        )
                    })}
                    <section>
                        <Button click={handleSubmit} type='submit' disabled={loading}>
                            {loading ? `Loading` : `Register`}
                        </Button>
                    </section>
                </form>
            </section>
            <section>
                <p>
                    Already have an account? <Link to='/login'>Sign In</Link>
                </p>
            </section>
        </main>
    );
}
