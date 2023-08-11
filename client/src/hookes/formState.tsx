import * as React from 'react';


export function useForm() {
    // input val state
    const [inputVal, setInputVal] = React.useState({
        name: '', email: '', password: ''
    })
    //console.log(inputVal);

    // error state
    const [inputErr, setInputErr] = React.useState({
        name: '', email: "", password: ''
    })
    //console.log(inputErr);
    const [validate, setValidate] = React.useState(false)

    // error handler functions for handling input errors
    const handleNameError = () => {
        if (inputVal.name === "") {
            setValidate(false)
            setInputErr({ ...inputErr, name: "username is required" })
        } else if (inputVal.name !== "") {
            setValidate(true)
            setInputErr({ ...inputErr, name: "" })
        }
    }
    const handleEmailError = () => {
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (inputVal.email === "") {
            setValidate(false)
            setInputErr({ ...inputErr, email: "email is required" })
        } else if (!emailPattern.test(inputVal.email)) {
            setValidate(false)
            setInputErr({ ...inputErr, email: 'This not a valid email address' })
        } else if (inputVal.email !== "" && emailPattern.test(inputVal.email)) {
            setValidate(true)
            setInputErr({ ...inputErr, email: "" })
        }
    }
    const handlePasswordError = () => {
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if (inputVal.password === "") {
            setValidate(false)
            setInputErr({ ...inputErr, password: "password is required" })
        } else if (!passwordPattern.test(inputVal.password)) {
            setValidate(false)
            setInputErr({ ...inputErr, password: 'password should contain at least 1 lower case letter, 1 uppercase letter, a number, a special character , a minimum length of 8 characters and a maximum of 12 characters' })
        } else if (inputVal.password !== "" && passwordPattern.test(inputVal.password)) {
            setInputErr({ ...inputErr, password: '' })
            setValidate(true)
        }
    }
    // storing the error handlers functions in an object
    const errorHandlers = { handleNameError, handleEmailError, handlePasswordError }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal({ ...inputVal, [e.target.name]: e.target.value })
    }
    return {
        inputVal,
        handleChange,
        inputErr,
        errorHandlers,
        validate
    }
}
