import React, {useContext, useEffect} from 'react'
import {MainLayout} from '../../layouts/MainLayout/MainLayout'
import {Bar} from 'react-chartjs-2/dist'
import {observer} from 'mobx-react-lite'
import {RequestContext} from '../../context/RequestContext'
import {Card, CardContent, Grid, Typography} from '@material-ui/core'
import {CornStatic} from './components/CornStatic'
import {loadingCorn} from '../../api'
import StoreContext from '../../context/StoreContext'
import {runInAction} from 'mobx'

export const DashboardPage = observer(() => {
    const stores = useContext(StoreContext)
    useEffect(() => {
        (async () => {
            try {
                const result = await loadingCorn()
                if (stores?.cornStore) {
                    runInAction(() => {
                        stores.cornStore.allCorn = result
                    })
                }
            } catch (e) {
                console.log(e.message)
            }
        })()
    }, [])

    const allSale = {
        labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октрябрь', 'Ноябрь', 'Декабрь'],
        datasets: [
            {
                label: 'Рожь',
                data: [5, 19, 3, 5, 2, 3, 5, 9, 4, 6, 7, 15],
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'Пшеница',
                data: [8, 15, 7, 5, 2, 5, 7, 9, 4, 6, 6, 10],
                backgroundColor: 'rgba(54, 162, 235, 1)',
            },
            {
                label: 'Ячмень',
                data: [4, 11, 3, 5, 2, 4, 6, 9, 4, 7, 7, 11],
                backgroundColor: 'rgba(255, 206, 86, 1)',
            },
        ],
    }

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


    return (
        <MainLayout>
            <h2>Панель приборов</h2>
            <Grid container spacing={3} justifyContent={'center'}>
                <Grid item xs={12} sm={6} md={4}>
                    <CornStatic/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Bar
                                data={allSale}
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
