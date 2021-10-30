import React, {FC, useContext, useState} from 'react'
import {useHttp} from '../../../hooks/http.hook'
import {AuthContext} from '../../../context/AuthContext'
import {useFormik} from 'formik'
import {Loader} from '../../../components/Loader'
import {runInAction} from 'mobx'
import {Box, Button, Grid, TextField} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {useSnackbar} from 'notistack'
import StoreContext from '../../../context/StoreContext'
import {addPoisons} from '../../../api'

type TypeForm = {
    name: string
    weight: number
    cost: number
    date: Date | null
}

export const AddPoisons: FC = () => {
    const stores = useContext(StoreContext)
    const [loading, setLoading] = useState(false)
    const poisonsFormik = useFormik<TypeForm>({
        initialValues: {
            name: '',
            weight: 0,
            cost: 0,
            date: null
        },
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const result = await addPoisons(values)
                const {poison} = result
                if (stores?.cornStore) {
                    runInAction(() => {
                        stores.cornStore.allPoisons = [...stores.cornStore.allPoisons, ...[poison]]
                    })
                    stores.userStore.enqueueSnackbar(`${poison.name} добавлен`, 'success')
                    poisonsFormik.resetForm()
                }
            } catch (e) {
                console.log(e.message)
            }
            setLoading(false)
        }
    })
    return (
        <form onSubmit={poisonsFormik.handleSubmit}>
            <Grid container spacing={5}>
                <Grid item xs={4}>
                    <TextField label={'Название яда'} onChange={poisonsFormik.handleChange} name='name' type="text"
                               fullWidth/>
                </Grid>
                <Grid item xs={4}>
                    <TextField label={'Объем(кг)'} onChange={poisonsFormik.handleChange} name='weight' type="number"
                               fullWidth/>
                </Grid>
                <Grid item xs={4}>
                    <TextField label={'Цена(руб)'} onChange={poisonsFormik.handleChange} name='cost' type="number"
                               fullWidth/>
                </Grid>
            </Grid>
            <Box my={3}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon/>}
                    type="submit"
                    disabled={loading}
                >
                    Добавить
                </Button>
            </Box>
        </form>
    )
}
