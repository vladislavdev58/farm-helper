import React, {useContext, useEffect, useRef} from 'react'
import {Button, Card, CardContent, Typography} from '@material-ui/core'
import {Pie} from 'react-chartjs-2/dist'
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import {useHttp} from '../hooks/http.hook'
import {TypeCorn} from '../types/types'
import {runInAction} from 'mobx'
import {AuthContext} from '../context/AuthContext'
import {Loader} from './Loader/Loader'
import StoreContext from '../context/StoreContext'

export const CornStatic = observer(() => {
    const stores = useContext(StoreContext)
    const startLoading = useRef(false)
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const loadingCorn = async () => {
        startLoading.current = true
        try {
            const fetched: TypeCorn[] = await request('api/corn/getList', 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            if (stores?.cornStore) {
                runInAction(() => {
                    stores.cornStore.allCorn = fetched
                })
            }
        } catch (e) {
        }
    }

    const getDatacorn = () => {
        const obj = {
            labels: stores?.cornStore.getAllName(),
            datasets: [
                {
                    data: stores?.cornStore.getAllWeight(),
                    backgroundColor: stores?.cornStore.getAllColor(0),
                    borderColor: stores?.cornStore.getAllColor(1),
                    borderWidth: 1,
                },
            ],
        }
        return obj
    }

    useEffect(() => {
        loadingCorn()
    }, [])
    if (loading) {
        return (
            <Card>
                <CardContent>
                    <Loader/>
                </CardContent>
            </Card>
        )
    }

    if (!stores?.cornStore.allCorn.length && startLoading.current) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Общее количество зерна
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Для начала заполните данные
                    </Typography>
                    <Button size="medium" color="primary" component={Link} to={'/corn'}>
                        Заполнить
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardContent>
                <Pie data={getDatacorn()}/>
                <Typography variant="h5" component="h2">
                    Общее количество зерна
                </Typography>
            </CardContent>
        </Card>
    )
})
