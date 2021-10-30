import React, {useCallback, useContext, useEffect, useState} from 'react'
import {MainLayout} from '../../layouts/MainLayout/MainLayout'
import {AddSale} from './components/AddSale'
import {SaleTable} from './components/SaleTable'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {TypeSale} from '../../types/types'
import {runInAction} from 'mobx'
import {Loader} from '../../components/Loader'
import {observer} from 'mobx-react-lite'
import {Box, Button, Grid, Typography} from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import StoreContext from '../../context/StoreContext'
import {loadSale} from '../../api'

export const SalePage = observer(() => {
    const stores = useContext(StoreContext)
    const [loading, setLoading] = useState(false)
    const [isShowForm, setIsShowForm] = useState<boolean>(false)
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const result:TypeSale[] = await loadSale()
                if (stores?.cornStore) {
                    runInAction(() => {
                        stores.cornStore.allSale = result
                    })
                }
                setLoading(false)
            }
        )()
    }, [])

    if (loading) return <MainLayout><Loader/></MainLayout>

    return(
        <MainLayout>
            <Box my={5}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h2" component="h1">Продажи</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={isShowForm ? <RemoveIcon/> : <AddCircleIcon/>}
                        onClick={() => setIsShowForm(!isShowForm)}
                    >
                        {isShowForm ? 'Закрыть' : 'Добавить продажу'}
                    </Button>
                </Grid>
            </Box>
            {isShowForm && <AddSale/>}
            <SaleTable/>
        </MainLayout>
    )
})
