import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Pie} from 'react-chartjs-2/dist'
import {CardMetric} from './CardMetric/CardMetric'
import CornStore from '../store/CornStore'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {TypeCorn} from '../types/types'
import {runInAction} from 'mobx'
import {observer} from 'mobx-react'
import {Loader} from './Loader/Loader'

export const CornStatic = observer(() => {

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const fetchCorn = useCallback(async () => {
        try {
            const fetched: TypeCorn[] = await request('api/corn/getList', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            runInAction(() => {
                CornStore.allCorn = fetched
            })
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        fetchCorn()
    }, [fetchCorn])

    const data = CornStore.allCorn.length ? {
        labels: CornStore.getAllName(),
        datasets: [
            {
                data: CornStore.getAllWeight(),
                backgroundColor: CornStore.getAllColor(0),
                borderColor: CornStore.getAllColor(1),
                borderWidth: 1,
            },
        ],
    } : {};
    return (
        <CardMetric
            text={'Общее количество зерна'}
            col={3}
        >
            {CornStore.allCorn.length ? (
                <Pie
                    data={data}
                />
            ) : (
                <Loader/>
            )}

        </CardMetric>
    )
})
