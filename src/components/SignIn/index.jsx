import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

import { auth, signInWithGoogle } from './../../firebase/utils'

import AuthWrapper from './../AuthWrapper'
import FormInput from './../forms/FormInput'
import Button from './../forms/Button'

const initialState = {
    email: '',
    password: '',
    errors: []
}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
    }
    
    handleChange = e => {
        const { name, value } = e.target;
        
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state

        try {
            
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                ...initialState
            })

        } catch (err) {
            this.setState({
                errors: [err.message]
            })
            // console.log(err)
        }
    }

    render() {
        const { email, password, errors } = this.state

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

                    <form onSubmit={this.handleSubmit}>

                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange={this.handleChange}
                        />

                        <FormInput 
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            handleChange={this.handleChange}
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
}

export default SignIn
