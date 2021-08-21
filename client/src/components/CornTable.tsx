import React from 'react'
import CornStore from '../store/CornStore'
import {observer} from 'mobx-react'
import {CornTableItem} from './CornTableItem'
import {runInAction} from 'mobx'

export const CornTable = observer(() => {
    const sortBy = (name: string) => {
        runInAction(() => {
            CornStore.allCorn.sort((a: any, b: any) => a[name] < b[name] ? 1 : -1)
        })
    }
    const sortByName = () => {
        runInAction(() => {
            CornStore.allCorn.sort((a: any, b: any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        })
    }
    if (!CornStore.allCorn.length) {
        return <p>Пусто</p>
    }
    return (
        <table>
            <thead>
            <tr>
                <th onClick={sortByName}>Название</th>
                <th onClick={() => sortBy('weight')}>Объем</th>
                <th onClick={() => sortBy('cost')}>Стоимость</th>
                <th>Редактировать</th>
                <th>Удалить</th>
            </tr>
            </thead>

            <tbody>
            {
                CornStore.allCorn.map((item, index) =>
                    <CornTableItem _id={item._id} name={item.name} weight={item.weight} cost={item.cost}
                                   key={item._id} index={index}/>
                )
            }
            </tbody>
        </table>
    )
})
