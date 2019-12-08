import React, { Component } from 'react';
import './style.scss';
import ValidationInput from '../ValidationInput';
import Avatar from '../Avatar';
import { options } from '../../countries'

const countries = options;

const TEXT_FIELD_EX = /^([a-zA-Z0-9 _-]+)$/;
const EMAIL_FIELD_EX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_FIELD_EX = /^([\S]{10,100})$/;

let formData = new Map();

class SignUpPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isValid: false,
            country: countries[0],
            isPromotionalEmails: false,
            password: '',
            confirmPassword: '',
        };
        formData.set('Country', countries[0]);
        formData.set('Send me promotional emails', false);
    }

    setValid = (isValid, logo, inputText) => {
        this.setState({
            isValid: isValid
        })
        formData.set(logo, inputText);
        if (logo === 'Password') {
            this.setState({
                password: inputText
            })
        }
        if (logo === 'Password Confirmation') {
            this.setState({
                confirmPassword: inputText
            })
        }
    }

    submitForm = (e) => {
        const { isValid } = this.state;
        e.preventDefault();
        if (isValid || (isValid && e.keyCode === 13)) {
            console.log('e.keyCode === 13');
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            })
        }
    }

    onHandleCheckers = (e) => {
        const { country, isPromotionalEmails } = this.state;
        switch (e.target.id) {
            case 'male':
                formData.set('Sex', 'male');
                break;
            case 'famele':
                formData.set('Sex', 'famele');
                break;
            case 'sendEmail':
                let isPromo = !isPromotionalEmails;
                this.setState({
                    isPromotionalEmails: isPromo
                });
                formData.set('Send me promotional emails', isPromo);
                break;
            case 'country':
                this.setState({
                    country: e.target.value
                })
                formData.set('Country', country);
                break;
            default:
                break;
        }
    }

    render() {
        const { isValid } = this.state;
        return (
            <section className='sign-up-page'>
                <form className='sign-up-page-container'>
                    <div className='fields-wrapper'>
                        <div className='fields-container'>
                            <div className='fields-container__column'>
                                <div className='fields-container__avatar'>
                                    <Avatar setValid={this.setValid} logo='Avatar' />
                                </div>
                                <div className='fields-container__sex'>
                                    <label>Male<input onChange={this.onHandleCheckers} id='male' type="radio" name="sex" /></label>
                                    <label>Famale<input onChange={this.onHandleCheckers} id='famele' type="radio" name="sex" /></label>
                                </div>
                                <div className='fields-container__countries'>
                                    <select id='country' onChange={this.onHandleCheckers}>
                                        {countries.map((country, index) => {
                                            return <option key={index}>{country}</option>
                                        })}
                                    </select>
                                </div>

                                <ValidationInput
                                    submitForm={this.submitForm}
                                    inpuType=''
                                    logo='First Name'
                                    validationExp={TEXT_FIELD_EX}
                                    errorMessage='First name is not valid'
                                    setValid={this.setValid}
                                />
                                <ValidationInput
                                    submitForm={this.submitForm}
                                    inpuType=''
                                    logo='Last Name'
                                    validationExp={TEXT_FIELD_EX}
                                    errorMessage='Last Name is not valid'
                                    setValid={this.setValid}
                                />
                                <ValidationInput
                                    submitForm={this.submitForm}
                                    inpuType=''
                                    logo='User Name'
                                    validationExp={TEXT_FIELD_EX}
                                    errorMessage='User Name is not valid'
                                    setValid={this.setValid}
                                />
                                <ValidationInput
                                    submitForm={this.submitForm}
                                    inpuType='email'
                                    logo='Email'
                                    validationExp={EMAIL_FIELD_EX}
                                    errorMessage='Email is not valid'
                                    setValid={this.setValid}
                                />
                                <ValidationInput
                                    submitForm={this.submitForm}
                                    inpuType='password'
                                    logo='Password'
                                    validationExp={PASSWORD_FIELD_EX}
                                    errorMessage='Password is not valid'
                                    setValid={this.setValid}
                                    password={this.state.confirmPassword}
                                />
                                <ValidationInput
                                    submitForm={this.submitForm}
                                    inpuType='password'
                                    logo='Password Confirmation'
                                    validationExp={PASSWORD_FIELD_EX}
                                    errorMessage='Field not match password'
                                    setValid={this.setValid}
                                    password={this.state.password}
                                />
                            </div>

                        </div>
                        <div className='checkbox-container'>
                            <label>Send me promotional emails <input onChange={this.onHandleCheckers} id='sendEmail' type="checkbox" /></label>
                        </div>
                        <button className={isValid ? 'submit__btn' : 'submit__btn--disable'}
                            onClick={this.submitForm}>Submit Form</button>
                    </div>
                </form>
            </section>
        );
    }
}

export default SignUpPage;

