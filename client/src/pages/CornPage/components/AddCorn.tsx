import React, {useContext} from 'react'
import {useFormik} from 'formik'
import {AuthContext} from '../../../context/AuthContext'
import {useHttp} from '../../../hooks/http.hook'
import {Loader} from '../../../components/Loader'
import {runInAction} from 'mobx'
import {Box, Button, Grid, TextField} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {useSnackbar} from 'notistack'
import StoreContext from '../../../context/StoreContext'

type TypeForm = {
    name: string
    weight: number
    cost: number
}

export const AddCorn = () => {
    const stores = useContext(StoreContext)
    const { enqueueSnackbar } = useSnackbar()
    const cornFormik = useFormik<TypeForm>({
        initialValues: {
            name: '',
            weight: 0,
            cost: 0
        },
        onSubmit: async (values) => {
            console.log(values)
            addHandler(values)

        }
    })
    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()
    const addHandler = async (values: TypeForm) => {
        try {
            const data = await request('/api/corn/addCorn', 'POST', {...values}, {
                Authorization: `Bearer: ${auth.token}`
            })
            const {corn} = data
            if (stores?.cornStore) {
                runInAction(() => {
                    stores.cornStore.allCorn = [...stores?.cornStore.allCorn, ...[corn]]
                })
            }
            enqueueSnackbar(`${corn.name} добавлено`, {
                variant: 'success',
            })
        } catch (e) {

        }
    }
    if (loading) {
        return <Loader/>
    }
    return (
        <form onSubmit={cornFormik.handleSubmit}>
            <Grid container spacing={5}>
                <Grid item xs={4}>
                    <TextField label={'Название зерна'} onChange={cornFormik.handleChange} name='name' type="text"
                               fullWidth/>
                </Grid>
                <Grid item xs={4}>
                    <TextField label={'Объем'} onChange={cornFormik.handleChange} name='weight' type="number"
                               fullWidth/>
                </Grid>
                <Grid item xs={4}>
                    <TextField label={'Стоимость'} onChange={cornFormik.handleChange} name='cost' type="number"
                               fullWidth/>
                </Grid>
            </Grid>
            <Box my={3}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon/>}
                    type="submit"
                >
                    Добавить
                </Button>
            </Box>
        </form>
    )
}
