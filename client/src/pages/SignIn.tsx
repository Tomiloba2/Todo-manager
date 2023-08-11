import * as React from 'react';
import teacher5 from '../assets/teacher5.webp'
import InputField from '../component/InputField';
import Button from '../component/Button';
import { Link } from 'react-router-dom'
import { useForm } from '../hookes/formState';
import { useSession } from '../hookes/Session';
import { useNavigate } from 'react-router-dom';
import { ErrorHandler, LoadingSpinner } from '../component/AsyncState';

/*export interface ISignInProps {
}*/

export default function SignIn() {
    const { inputVal, handleChange } = useForm()
    const navigate = useNavigate()
    const fields = [
        {
            value: inputVal.email,
            name: 'email',
            type: 'email',
            onChange: handleChange,
            placeholder: 'Enter your email',
            // onblur: errorHandlers.handleEmailError,
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
    const session = useSession()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        session?.Login(inputVal)
            .then(() => navigate('/main'))
    }
    return (
        <main id='sign-in'>
            <div>{session?.err.status && <ErrorHandler message={session?.err.message} />}</div>
            <div>{session?.loading && <LoadingSpinner />}</div>
            <section>
                <h3>Welcome Back</h3>
            </section>
            <section>
                <img src={teacher5} alt="" />
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
                        <Link to={``}>
                            <p>forgot password</p>
                        </Link>
                    </section>
                    <section>
                        <Button click={handleSubmit} type='submit' disabled={session?.loading}>
                            {session?.loading ? `Loading...` : `Sign in`}
                        </Button>
                    </section>

                </form>
            </section>
            <section>
                <p>Don't have an account? <Link to='/signUp'>Sign Up</Link></p>
            </section>
        </main>
    );
}
