import React from 'react'
import CornStore from '../store/CornStore'
import {observer} from 'mobx-react'


export const PoisonsTable = observer(() => {
    if (!CornStore.allPoisons.length) {
        return (
            <p>Пусто</p>
        )
    }
    return (
        <table>
            <thead>
            <tr>
                <th>Название</th>
                <th>Объем</th>
                <th>Стоимость</th>
                <th>Дата</th>
            </tr>
            </thead>

            <tbody>
            {
                CornStore.allPoisons.map((item, index) => {
                    return (
                        <tr key={item._id}>
                            <td>{item.title}</td>
                            <td>{item.weight}</td>
                            <td>{item.cost}</td>
                            <td>{new Date(item.date).toLocaleDateString()}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
})