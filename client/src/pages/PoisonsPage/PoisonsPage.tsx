import React, {useContext, useEffect, useState} from 'react'
import {MainLayout} from '../../layouts/MainLayout/MainLayout'
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
import {loadPoisons} from '../../api'


export const PoisonsPage = observer(() => {
    const stores = useContext(StoreContext)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                try {
                    const result:TypePoisons[] = await loadPoisons()
                    if(stores?.cornStore) {
                        runInAction(() => {
                            stores.cornStore.allPoisons = result
                        })
                    }
                } catch (e) {
                    console.log(e.message)
                }
                setLoading(false)
            }
        )()
    }, [])

    const [isShowForm, setIsShowForm] = useState<boolean>(false)
    if (loading) {
        return (
            <MainLayout>
                <Loader/>
            </MainLayout>
        )
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
