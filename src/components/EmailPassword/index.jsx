import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import './styles.scss'

import { auth } from './../../firebase/utils'

import AuthWrapper from './../AuthWrapper'
import FormInput from './../forms/FormInput'
import Button from './../forms/Button'

const EmailPassword = props => {
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const config = {
                url: 'http://localhost:3000/login'
            }

            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    props.history.push('/login')
                })
                .catch((err) => {
                    setErrors(['Email not found. Please try again.'])
                    console.log(err)
                })

        } catch (err) {
            console.error(err)
        }
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