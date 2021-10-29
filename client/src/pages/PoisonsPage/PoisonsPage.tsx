import React, {useCallback, useContext, useEffect, useState} from 'react'
import {MainLayout} from '../../layouts/MainLayout/MainLayout'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {Loader} from '../../components/Loader'
import {AddPoisons} from './components/AddPoisons'
import {PoisonsTable} from './components/PoisonsTable'
import {TypePoisons} from '../../types/types'
import {observer} from 'mobx-react-lite'
import {runInAction} from 'mobx'
import {Box, Button, Grid, Typography} from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import StoreContext from '../../context/StoreContext'


export const PoisonsPage = observer(() => {
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const stores = useContext(StoreContext)
    const fetchPoisons = useCallback(async () => {
        try {
            const fetched: TypePoisons[] = await request('api/poisons/getList', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            if(stores?.cornStore) {

                runInAction(() => {
                    stores.cornStore.allPoisons = fetched
                })
            }
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        fetchPoisons()
    }, [fetchPoisons])

    const [isShowForm, setIsShowForm] = useState<boolean>(false)

    if (loading) {
        return <MainLayout><Loader/></MainLayout>
    }
    return (
        <MainLayout>
            <Box my={5}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h2" component="h1">Яды</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={isShowForm ? <RemoveIcon/> : <AddCircleIcon/>}
                        onClick={() => setIsShowForm(!isShowForm)}
                    >
                        {isShowForm ? 'Закрыть' : 'Добавить яд'}
                    </Button>
                </Grid>
            </Box>
            {isShowForm && <AddPoisons/>}
            <PoisonsTable/>
        </MainLayout>
    )
})
