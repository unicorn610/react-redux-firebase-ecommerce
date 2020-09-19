import React, { Component } from 'react'
import './styles.scss'

import { auth, handleUserProfile } from './../../firebase/utils'

import AuthWrapper from './../AuthWrapper'
import FormInput from './../forms/FormInput'
import Button from './../forms/Button'

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
}

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
    }

    handleChange = e => {
        const { name, value } = e.target

        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = async e => {
        e.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state

        if (password !== confirmPassword) {
            const err = ['Password Doesn\'t match']
            this.setState({
                errors: err
            })
            return;
        }

        try {
            
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, {displayName})

            this.setState({
                ...initialState
            })
        } catch(err) {
            this.setState({
                errors: [err.message]
            })
            // console.log(err)
        }
    }

    render() {
        const { displayName, email, password, confirmPassword, errors } = this.state

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

                    <form onSubmit={this.handleFormSubmit}>
                        <FormInput 
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Full name"
                            handleChange={this.handleChange}
                        />

                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="E-mail"
                            handleChange={this.handleChange}
                        />
                        
                        <FormInput 
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            handleChange={this.handleChange}
                        />

                        <FormInput 
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            handleChange={this.handleChange}
                        />

                        <Button type="submit">
                            Register
                        </Button>
                    </form>
                </div>
            </AuthWrapper>
        )
    }
}

export default SignUp