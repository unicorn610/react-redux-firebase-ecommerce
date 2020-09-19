import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './styles.scss'

import { auth, handleUserProfile } from './../../firebase/utils'

import AuthWrapper from './../AuthWrapper'
import FormInput from './../forms/FormInput'
import Button from './../forms/Button'

const SignUp = props => {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])

    const resetForm = () => {
        setDisplayName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    const handleFormSubmit = async e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            const err = ['Password Doesn\'t match']
            setErrors(err)
            return;
        }

        try {
            
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, {displayName})
            resetForm()

        } catch(err) {
            setErrors([err.message])
            // console.log(err)
        }
    }

    const configAuthWrapper = {
        headline: 'SignUp'
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

                <form onSubmit={handleFormSubmit}>
                    <FormInput 
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full name"
                        handleChange={e => setDisplayName(e.target.value)}
                    />

                    <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                    />
                    
                    <FormInput 
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={e => setPassword(e.target.value)}
                    />

                    <FormInput 
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        handleChange={e => setConfirmPassword(e.target.value)}
                    />

                    <Button type="submit">
                        Register
                    </Button>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default withRouter(SignUp)