import React, {useContext, useEffect, useState} from 'react'
import {MainLayout} from '../../layouts/MainLayout/MainLayout'
import {Bar} from 'react-chartjs-2/dist'
import {observer} from 'mobx-react-lite'
import {Card, CardContent, Grid, Typography} from '@material-ui/core'
import {CornStatic} from './components/CornStatic'
import {loadCorn, loadSale} from '../../api'
import StoreContext from '../../context/StoreContext'
import {runInAction} from 'mobx'
import {TypeCornData} from '../../types/corn'
import {TypeSaleData} from '../../types/sale'
import {Loader} from '../../components/Loader'

export const DashboardPage = observer(() => {
    const stores = useContext(StoreContext)
    const [loadingCorn, setLoadingCorn] = useState(true)
    const [loadingSale, setLoadingSale] = useState(true)
    useEffect(() => {
        (async () => {
            setLoadingCorn(true)
            try {
                const result: TypeCornData[] = await loadCorn()
                if (stores?.cornStore) {
                    runInAction(() => {
                        stores.cornStore.allCorn = result
                    })
                }
            } catch (e) {
                stores?.userStore.enqueueSnackbar(e.message, 'error')
            }
            setLoadingCorn(false)
        })()
    }, [stores?.cornStore])

    useEffect(() => {
        (
            async () => {
                try {
                    setLoadingSale(true)
                    const result: TypeSaleData[] = await loadSale()
                    console.log(result)
                    if (stores?.cornStore) {
                        runInAction(() => {
                            stores.cornStore.allSale = result
                        })
                    }
                } catch (e) {
                    stores?.userStore.enqueueSnackbar(e.message, 'error')
                }
                setLoadingSale(false)
            }
        )()
    }, [stores?.cornStore])

    const optionsAllSale = {
        scales: {
            yAxes: [
                {
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
            xAxes: [
                {
                    stacked: true,
                },
            ],
        },
    }

    if (loadingSale && loadingCorn) return <MainLayout><Loader/></MainLayout>

    return (
        <MainLayout>
            <h2>Панель приборов</h2>
            <Grid container spacing={3} justifyContent={'center'}>
                <Grid item xs={12} sm={6} md={4}>
                    <CornStatic/>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Card>
                        <CardContent>
                            <Bar
                                data={stores?.cornStore.getInfoSalesBar()}
                                options={optionsAllSale}
                            />
                            <Typography variant="h5" component="h2">
                                Продажи по месяцам
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/*<Grid item xs={12} sm={6} md={4}>*/}
                {/*    <Card>*/}
                {/*        <CardContent>*/}
                {/*            */}
                {/*        </CardContent>*/}
                {/*    </Card>*/}
                {/*</Grid>*/}
            </Grid>
        </MainLayout>
    )
})
