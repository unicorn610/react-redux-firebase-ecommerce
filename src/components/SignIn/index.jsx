import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './styles.scss'

import { auth, signInWithGoogle } from './../../firebase/utils'

import AuthWrapper from './../AuthWrapper'
import FormInput from './../forms/FormInput'
import Button from './../forms/Button'

const SignIn = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const resetForm = () => {
        setEmail('')
        setPassword('')
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            
            await auth.signInWithEmailAndPassword(email, password);
            resetForm()
            props.history.push('/')

        } catch (err) {
            setErrors([err.message])
            // console.log(err)
        }
    }

    const configAuthWrapper = {
        headline: 'LogIn'
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

                    <FormInput 
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={e => setPassword(e.target.value)}
                    />

                    <Button type="submit">
                        Login
                    </Button>

                    <div className="socialSignin">
                        <div className="row">
                            <Button type="button" onClick={signInWithGoogle}>
                                Sign in with Google
                            </Button>
                        </div>
                    </div>

                    <div className="links">
                        <Link to="/recovery">
                            Reset Password
                        </Link>
                    </div>

                </form>
            </div> 
        </AuthWrapper>
    )
}

export default withRouter(SignIn)
