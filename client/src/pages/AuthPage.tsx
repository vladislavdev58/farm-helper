import React, {useContext, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    type FormType = {
        email: string
        password: string
    }
    const [form, setForm] = useState<FormType>({
        email: '',
        password: ''
    })

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
        console.log(form)
    }
    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log(data)
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.id)
        } catch (e) {

        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="row">
                    <div className="input-field col s12">
                        <input type="email" className="validate" name='email' onChange={event => changeHandler(event)}/>
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input type="password" name='password' className="validate"
                               onChange={event => changeHandler(event)}/>
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
            </div>
            <button onClick={registerHandler} disabled={loading}>Зарегистрироваться</button>
            <button onClick={loginHandler} disabled={loading}>Авторизироватсья</button>
        </div>
    )
}