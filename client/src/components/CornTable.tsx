import React from 'react'
import CornStore from '../store/CornStore'
import {observer} from 'mobx-react'

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
            </tr>
            </thead>

            <tbody>
            {
                CornStore.allCorn.map((item, index) => {
                    return(
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.weight}</td>
                            <td>{item.cost}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
})
