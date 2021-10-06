import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {useMessage} from '../../hooks/message.hook'
import {Button, Container, Grid, TextField, Typography} from '@material-ui/core'
import { useSnackbar } from 'notistack'
import bg from './images/bg.jpg'
import {login} from '../../api'

type FormType = {
    email: string
    password: string
}

export const AuthPage = () => {
    const [form, setForm] = useState<FormType>({
        email: '',
        password: ''
    })

    const { enqueueSnackbar } = useSnackbar()

    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})

        } catch (e) {

        }
    }

    const loginHandler = async () => {
        login(form)
    }
    useEffect(() => {
        if (error) enqueueSnackbar(error, {
            variant: 'error',
        })
        clearError()
    }, [error, enqueueSnackbar, clearError])
    const style = {
        bg: {
            backgroundImage: `url(${bg})`,
            height: '100vh',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        },
        form: {
            backgroundColor: 'rgba(255, 255, 255, .9)',
            borderRadius: 10,
            paddingTop: 10,
            paddingBottom: 20
        }
    }
    return (
        <Grid style={style.bg} container alignItems="center">
            <Container maxWidth="xs" style={style.form}>
                <Typography component="h1" variant="h5">
                    Добро пожаловать 👋
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Почта"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(event) => changeHandler(event)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(event) => changeHandler(event)}
                />
                <Grid container spacing={1} direction="column">
                    <Grid item>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Войти
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Зарегистрироваться
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    )
}
