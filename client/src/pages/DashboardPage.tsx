import React from 'react'
import {MainLayout} from '../layouts/MainLayout/MainLayout'
import {CardMetric} from '../components/CardMetric/CardMetric'
import {Pie, Bar, Line} from 'react-chartjs-2/dist'
import CornStore from '../store/CornStore'
import {observer} from 'mobx-react'

export const DashboardPage = observer(() => {
    const allCorn = {
        labels: CornStore.getAllName(),
        datasets: [
            {
                label: '# of Votes',
                data: CornStore.getAllWeight(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const allSale = {
        labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октрябрь','Ноябрь', 'Декабрь'],
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
    };

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
    };

    const harvesting = {
        labels: ['Июнь', 'Июль', 'Август'],
        datasets: [
            {
                label: 'ГА',
                data: [200, 300, 250],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const optionsHarvesting = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <MainLayout>
            <h2>Панель приборов</h2>
            <div className='row'>
                <CardMetric
                text={'Общее количество зерна'}
                col={3}
                >
                    <Pie
                        data={allCorn}
                    />
                </CardMetric>
                <CardMetric
                    text={'Продажи по месяцам'}
                    col={6}
                >
                    <Bar
                        data={allSale}
                        options={optionsAllSale}
                    />
                </CardMetric>
                <CardMetric text={'Уборка ГА за месяц'} col={3}>
                    <Line data={harvesting} options={optionsHarvesting} />
                </CardMetric>
            </div>
        </MainLayout>
    )
})
