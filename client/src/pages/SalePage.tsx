import React, {useCallback, useContext, useEffect, useState} from 'react'
import {MainLayout} from '../layouts/MainLayout/MainLayout'
import {AddSale} from '../components/AddSale'
import {SaleTable} from '../components/SaleTable'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {TypeSale} from '../types/types'
import {runInAction} from 'mobx'
import CornStore from '../store/CornStore'
import {Loader} from '../components/Loader/Loader'
import {observer} from 'mobx-react'
import {Box, Button, Grid, Typography} from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddCircleIcon from '@material-ui/icons/AddCircle'

export const SalePage = observer(() => {
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const fetchSale = useCallback(async () => {
        try {
            const fetched: TypeSale[] = await request('api/sale/get', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            runInAction(() => {
                CornStore.allSale = fetched
            })
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        fetchSale()
    }, [fetchSale])
    const [isShowForm, setIsShowForm] = useState<boolean>(false)
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
