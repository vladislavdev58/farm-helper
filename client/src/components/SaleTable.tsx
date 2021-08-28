import React from 'react'
import CornStore from '../store/CornStore'
import {observer} from "mobx-react";

export const SaleTable = observer(() => {
    return(
        <table>
            <thead>
            <tr>
                <th>Название</th>
                <th>Объем(кг)</th>
                <th>Сумма</th>
                <th>Дата</th>
            </tr>
            </thead>

            <tbody>
            {
                CornStore.allSale.map((item) => {
                    return (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.weight}</td>
                            <td>{item.sum}</td>
                            <td>{new Date(item.date).toLocaleDateString()}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
})
