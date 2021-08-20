import React from 'react'
import CornStore from '../store/CornStore'
import {observer} from 'mobx-react'
import {CornTableItem} from './CornTableItem'

type MyProps = {
    _id: string
    name: string
    weight: number
    cost: number
}

export const CornTable = observer(() => {
    console.log(CornStore.allCorn.length)
    if (!CornStore.allCorn.length) {
        return <p>Пусто</p>
    }
    return (
        <table>
            <thead>
            <tr>
                <th>Название</th>
                <th>Объем</th>
                <th>Стоимость</th>
                <th>Редактировать</th>
            </tr>
            </thead>

            <tbody>
            {
                CornStore.allCorn.map((item) =>
                    <CornTableItem _id={item._id} name={item.name} weight={item.weight} cost={item.cost} key={item._id}/>
                )
            }
            </tbody>
        </table>
    )
})
