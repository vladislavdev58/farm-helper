import React from 'react'
import {Pie} from 'react-chartjs-2/dist'
import {CardMetric} from './CardMetric/CardMetric'
import CornStore from '../store/CornStore'
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom'

export const CornStatic = observer(() => {
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
    } : {}
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
                <>
                    <p>Для начала заполните данные</p>
                    <Link to='/add-corn'>Заполнить</Link>
                </>
            )}

        </CardMetric>
    )
})
