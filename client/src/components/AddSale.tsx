import React, {useContext} from 'react'
import {useMessage} from '../hooks/message.hook'
import {useFormik} from 'formik'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {runInAction, toJS} from 'mobx'
import CornStore from '../store/CornStore'
import {Loader} from './Loader/Loader'
import {observer} from 'mobx-react'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {Box, Button, Grid, InputLabel, MenuItem, Select, TextField} from '@material-ui/core'
import {RequestContext} from '../context/RequestContext'


type TypeForm = {
    _id: string
    weight: number
    date: Date | null
}

export const AddSale = observer(() => {
    const req = useContext(RequestContext)
    const message = useMessage()
    const saleFormik = useFormik<TypeForm>({
        initialValues: {
            _id: CornStore.allCorn[0]._id,
            weight: 0,
            date: null
        },
        onSubmit: async (values) => {
            await addHandler(values)
            req.loadingCorn()
        }
    })
    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()
    const addHandler = async (values: TypeForm) => {
        try {
            const data = await request('/api/sale/add', 'POST', {...values}, {
                Authorization: `Bearer: ${auth.token}`
            })
            const {sale} = data
            runInAction(() => {
                console.log(toJS(CornStore.allSale))
                CornStore.allSale = [...CornStore.allSale, ...[sale]]
                console.log(toJS(CornStore.allSale))
            })
            message(data.message)
        } catch (e) {
            console.log(e)
            message(e.message)
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
                    <Select labelId="selectLabel" id="select" defaultValue={CornStore.allCorn[0]._id} name='_id'
                            onChange={event => saleFormik.setFieldValue('_id', event.target.value)}
                            fullWidth>
                        {
                            CornStore.allCorn.map(({_id, name, cost, weight}) =>
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
