import React, {useContext, useState} from 'react'
import {Button, Container, Grid, TextField, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import bg from './images/bg.jpg'
import {login, register} from '../../api'
import StoreContext from '../../context/StoreContext'
import {observer} from 'mobx-react-lite'
import {TypeAuthData} from '../../types/auth'

type StorageType = {
    userId: string | null
    token: string | null
}


const useStyles = makeStyles({
    grid: {
        backgroundImage: `url(${bg})`,
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
});

export const AuthPage = observer(() => {
    const stores = useContext(StoreContext)
    const classes = useStyles();
    const [form, setForm] = useState<TypeAuthData>({
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
        <Grid className={classes.grid} container alignItems="center">
            <Container maxWidth="xs" style={style.form}>
                <Typography component="h1" variant="h5">
                    ?????????? ???????????????????? ????
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="??????????"
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
                    label="????????????"
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
                            ??????????
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
                            ????????????????????????????????????
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    )
})
