import React, { useState, useEffect } from 'react';

import {
    Button,
    Label,
    TextInput,
    Form,
    Alert,
    Fieldset,
} from '@trussworks/react-uswds';

import { authenticate } from '../../utils/api/easeyAuthApi';
import LoadingModal from '../LoadingModal/LoadingModal';

const cdx_user = sessionStorage.getItem('cdx_user') ? JSON.parse(sessionStorage.getItem('cdx_user')) : false;

const Login = () => {
    const standardFormErrorMessage = 'Please enter your username and password';
    const [formErrorMessage, setFormErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    // const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState('');
    // const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);

    const checkLoggedIn = () => {
        if (cdx_user) {
            window.location = '/monitoring-plans';
        }
    };

    // const renderLoginErrors = () => {
    //     const errorsArray = ['Username not found.', 'Password not found.'];
    //
    //     // return (
    //     //
    //     // );
    //     return errorsArray.map(item => {
    //         <div key={item}>
    //             <span>{item}</span>
    //             <br/>
    //         </div>
    //     })
    // };

    const submitForm = async e => {
        e.preventDefault();
        const formReady = !(username !== '' || password !== '');

        if (!formReady) {
            setFormErrorMessage(standardFormErrorMessage);
        }

        if (username !== '' && password !== '') {
            setLoading(true);

            try {
                return await authenticate({ userId: username, password }).then(response => {
                    setLoading(false);

                    if (response.status === 'Valid') {
                        setUsername('');
                        setPassword('');
                        setFormErrorMessage('');
                    } else if (response.error) {
                        throw response.error;
                    }
                }).catch(catchErr => {
                    setLoading(false);

                    throw catchErr;
                });
            } catch (err) {
                setLoading(false);
                setFormErrorMessage(err.message);
            }
        }
    };

    useEffect(() => {
        checkLoggedIn();
    }, []);

    return (
        <div className="margin-10">
            {/*<h1 data-test="component-title">Log In</h1>*/}
            <div style={{ marginLeft: '4rem' }}>
                <Form onSubmit={submitForm} large>
                    <Fieldset legend="Log In" legendStyle="large">
                        <span>
                          or <a
                                href="https://dev.epacdx.net/Registration/Terms"
                                target="_blank">
                                create an account
                            </a>
                        </span>

                        {formErrorMessage && <Alert type="error" heading="Log In Errors">
                            { formErrorMessage }
                        </Alert>}

                        <Label htmlFor="username">Username</Label>
                        <TextInput
                            id="username"
                            name="username"
                            type={username ? 'text' : 'password'}
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />

                        <Label htmlFor="password">Password</Label>
                        <TextInput
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <p className="usa-form__note">
                            <a
                                title="Show password"
                                href="javascript:void(0);"
                                className="usa-show-password"
                                aria-controls="password-sign-in"
                                onClick={(): void =>
                                    setShowPassword((showPasswordValue) => !showPassword)
                                }>
                                {showPassword ? 'Hide password' : 'Show password'}
                            </a>
                        </p>

                        <Button
                            data-test="component-login-submit-button"
                            type="submit"
                        >Login In</Button>
                        
                        <p>
                            <a
                                href="https://dev.epacdx.net/AccountRecovery/ForgotUserId"
                                target="_blank">
                                Forgot username?
                            </a>
                        </p>
                        <p>
                            <a
                                href="https://dev.epacdx.net/PasswordReset/GetResetCode"
                                target="_blank">
                                Forgot password?
                            </a>
                        </p>
                    </Fieldset>
                </Form>
            </div>
            <LoadingModal loading={loading} />
        </div>
    );
}

export default Login;