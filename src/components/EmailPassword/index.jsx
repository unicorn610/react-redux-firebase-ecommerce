import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './styles.scss'

import { auth } from './../../firebase/utils'

import AuthWrapper from './../AuthWrapper'
import FormInput from './../forms/FormInput'
import Button from './../forms/Button'

const initialState = {
    email: '',
    errors: []
}

class EmailPassword extends Component {
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

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { email } = this.state

            const config = {
                url: 'http://localhost:3000/login'
            }

            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    this.props.history.push('/login')
                })
                .catch((err) => {
                    this.setState({
                        errors: ['Email not found. Please try again.']
                    })
                    console.log(err)
                })

        } catch (err) {
            console.error(err)
        }
    }

    render() {
        const { email, errors } = this.state

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

                    <form onSubmit={this.handleSubmit}>

                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange={this.handleChange}
                        />

                        <Button type="submit">
                            Email Password
                        </Button>

                    </form>
                </div>
            </AuthWrapper>
        );
    }
}

export default withRouter(EmailPassword);