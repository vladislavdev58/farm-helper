import React, {useContext} from 'react'
import {useFormik} from 'formik'
import {AuthContext} from '../../../context/AuthContext'
import {useHttp} from '../../../hooks/http.hook'
import {runInAction} from 'mobx'
import {Loader} from '../../../components/Loader'
import {observer} from 'mobx-react-lite'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {Box, Button, Grid, InputLabel, MenuItem, Select, TextField} from '@material-ui/core'
import {useSnackbar} from 'notistack'
import StoreContext from '../../../context/StoreContext'


type TypeForm = {
    _id: string | undefined
    weight: number
    date: Date | null
}

export const AddSale = observer((store:any) => {
    const stores = useContext(StoreContext)
    const { enqueueSnackbar } = useSnackbar()
    const saleFormik = useFormik<TypeForm>({
        initialValues: {
            _id: stores?.cornStore.allCorn[0]._id,
            weight: 0,
            date: null
        },
        onSubmit: async (values) => {
            await addHandler(values)
        }
    })
    console.log(store)
    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()
    const addHandler = async (values: TypeForm) => {
        try {
            const data = await request('/api/sale/add', 'POST', {...values}, {
                Authorization: `Bearer: ${auth.token}`
            })
            const {sale} = data
            if (stores?.cornStore) {
                runInAction(() => {
                    stores.cornStore.allCorn = [...stores.cornStore.allCorn, ...[sale]]
                })
            }
            enqueueSnackbar(data.message, {
                variant: 'success',
            })
        } catch (e) {
            console.log(e)
            enqueueSnackbar(e.message, {
                variant: 'error',
            })
        }
    }
    if (loading) {
        return <Loader/>
    }
    return (
        <form onSubmit={saleFormik.handleSubmit}>
            <Grid container spacing={5}>
                <Grid item xs={4}>
                    <InputLabel id="selectLabel">Выберите зерно</InputLabel>
                    <Select labelId="selectLabel" id="select" defaultValue={store.cornStore.allCorn[0]._id} name='_id'
                            onChange={event => saleFormik.setFieldValue('_id', event.target.value)}
                            fullWidth>
                        {
                            stores?.cornStore.allCorn.map(({_id, name, cost, weight}) =>
                                <MenuItem value={_id} key={_id}>{`${name}(${cost}₽, ${weight}кг)`}</MenuItem>
                            )
                        }
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <TextField label={'Объем'} onChange={saleFormik.handleChange} name='weight' type="number"
                               fullWidth/>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="date"
                        label="Дата продажи"
                        type="date"
                        onChange={saleFormik.handleChange}
                        defaultValue={null}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
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
})
