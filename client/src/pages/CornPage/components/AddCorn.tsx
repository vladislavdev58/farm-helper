import React, {useContext} from 'react'
import {useFormik} from 'formik'
import {runInAction} from 'mobx'
import {Box, Button, Grid, TextField} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import StoreContext from '../../../context/StoreContext'
import {addCorn} from '../../../api'

type TypeForm = {
    name: string
    weight: number
    cost: number
}

export const AddCorn = () => {
    const stores = useContext(StoreContext)
    const cornFormik = useFormik<TypeForm>({
        initialValues: {
            name: '',
            weight: 0,
            cost: 0
        },
        onSubmit: async (values) => {
            try {
                const result = await addCorn(values)
                const {corn} = result
                if (stores?.cornStore) {
                    runInAction(() => {
                        stores.cornStore.allCorn = [...stores?.cornStore.allCorn, ...[corn]]
                    })
                    stores.userStore.enqueueSnackbar(`${corn.name} - добавлено`, 'success')
                }
            } catch (e) {
                stores?.userStore.enqueueSnackbar(e.message, 'error')
            }
        }
    })
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
