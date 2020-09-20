import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, resetAllAuthForms } from './../../redux/User/user.actions'

import './styles.scss'

import AuthWrapper from './../AuthWrapper'
import FormInput from './../forms/FormInput'
import Button from './../forms/Button'

const mapState = ({ user }) => ({
    resetPwdSuccess: user.resetPwdSuccess,
    resetPwdError: user.resetPwdError
})

const EmailPassword = props => {
    const { resetPwdSuccess, resetPwdError } = useSelector(mapState)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (resetPwdSuccess) {
            dispatch(resetAllAuthForms())
            props.history.push('/login')
        }

    }, [resetPwdSuccess])

    useEffect(() => {
        if (Array.isArray(resetPwdError) && resetPwdError.length > 0) {
            setErrors(resetPwdError)
        }

    }, [resetPwdError])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(resetPassword({ email }))
    }

    const configAuthWrapper = {
        headline: 'Email Password'
    }

    return (
        <AuthWrapper {...configAuthWrapper}>
        
            <div className="formWrap">

                {errors.length > 0 && (
                    <ul>
                        {errors.map((e, i) => {
                            return (
                                <li key={i}>
                                    {e}
                                </li>
                            )
                        })}
                    </ul>
                )}

                <form onSubmit={handleSubmit}>

                    <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                    />

                    <Button type="submit">
                        Email Password
                    </Button>

                </form>
            </div>
        </AuthWrapper>
    );
}

export default withRouter(EmailPassword);