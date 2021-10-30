import React, {useContext, useState} from 'react'
import {useFormik} from 'formik'
import {runInAction} from 'mobx'
import {observer} from 'mobx-react-lite'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {Box, Button, Grid, InputLabel, MenuItem, Select, TextField} from '@material-ui/core'
import StoreContext from '../../../context/StoreContext'
import {addSale} from '../../../api'
import {TypeSaleData, TypeSaleForm} from '../../../types/sale'
import {TypeCornData} from '../../../types/corn'

export const AddSale = observer(() => {
    const stores = useContext(StoreContext)
    const [loading, setLoading] = useState(false)
    const saleFormik = useFormik<TypeSaleForm>({
        initialValues: {
            _id: stores?.cornStore.allCorn[0]._id,
            weight: '',
            date: null
        },
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const result = await addSale(values)
                const {sale, updateCorn} : {sale: TypeSaleData, updateCorn: TypeCornData} = result
                if (stores?.cornStore) {
                    runInAction(() => {
                        stores.cornStore.allSale = [...stores.cornStore.allSale, ...[sale]]
                    })
                    setCorn(updateCorn)
                    stores.userStore.enqueueSnackbar(result.message, 'success')
                }
            } catch (e) {
                stores?.userStore.enqueueSnackbar(e.message, 'error')
            }
            setLoading(false)
        }
    })

    const setCorn = (updateCorn:TypeCornData) => {
        const indexSearch = stores?.cornStore.allCorn.findIndex(item => item._id === updateCorn._id)
        if (indexSearch && indexSearch !== -1 && stores?.cornStore) {
            runInAction(() => {
                stores.cornStore.allCorn[indexSearch] = updateCorn
            })
        }
    }

    return (
        <form onSubmit={saleFormik.handleSubmit}>
            <Grid container spacing={5}>
                <Grid item xs={4}>
                    <InputLabel id="selectLabel">Выберите зерно</InputLabel>
                    <Select labelId="selectLabel" id="select" defaultValue={stores?.cornStore.allCorn[0]._id} name='_id'
                            onChange={event => saleFormik.setFieldValue('_id', event.target.value)}
                            fullWidth>
                        {
                            stores?.cornStore.allCorn && stores.cornStore.allCorn.map(({_id, name, cost, weight}) =>
                                <MenuItem value={_id} key={_id}>{`${name}(${cost}₽, ${weight}кг)`}</MenuItem>
                            )
                        }
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <TextField label={'Объем'} onChange={saleFormik.handleChange} name='weight' type="text"
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
                    disabled={loading}
                >
                    Добавить
                </Button>
            </Box>
        </form>
    )
})
