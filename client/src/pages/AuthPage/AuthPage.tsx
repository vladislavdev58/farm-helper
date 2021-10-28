import React, {useContext, useState} from 'react'
import {Button, Container, Grid, TextField, Typography} from '@material-ui/core'
import bg from './images/bg.jpg'
import {login, register} from '../../api'
import StoreContext from '../../context/StoreContext'
import {observer} from 'mobx-react-lite'

type FormType = {
    email: string
    password: string
}

type StorageType = {
    userId: string | null
    token: string | null
}

export const AuthPage = observer(() => {
    const stores = useContext(StoreContext)
    const [form, setForm] = useState<FormType>({
        email: '',
        password: ''
    })

    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async () => {
        try {
            const result = await register(form)
            stores?.userStore.enqueueSnackbar(result.message, 'success')
        } catch (e) {
            stores?.userStore.enqueueSnackbar(e.message, 'error')
        }
    }

    const loginHandler = async () => {
        try {
            const result = await login(form)
            const {token, userId} = result
            localStorage.setItem('userData', JSON.stringify({
                token, userId
            } as StorageType))
            if (stores?.userStore) {
                stores.userStore.token = token
                stores.userStore.userId = userId
            }
        } catch (e) {
            stores?.userStore.enqueueSnackbar(e.message, 'error')
        }

    }
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
                        >
                            Зарегистрироваться
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    )
})
