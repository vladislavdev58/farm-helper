import React from 'react'
import CornStore from '../store/CornStore'

export const SaleTable = () => {
    return(
        <table>
            <thead>
            <tr>
                <th>Название</th>
                <th>Объем(кг)</th>
                <th>Цена(руб)</th>
                <th>Стоимость(кг/р)</th>
                <th>Дата</th>
            </tr>
            </thead>

            <tbody>
            {/*{*/}
            {/*    CornStore.allPoisons.map((item, index) => {*/}
            {/*        return (*/}
            {/*            <tr key={item._id}>*/}
            {/*                <td>{item.name}</td>*/}
            {/*                <td>{item.weight}</td>*/}
            {/*                <td>{item.cost}</td>*/}
            {/*                <td>{item.sum}</td>*/}
            {/*                <td>{new Date(item.date).toLocaleDateString()}</td>*/}
            {/*            </tr>*/}
            {/*        )*/}
            {/*    })*/}
            {/*}*/}
            </tbody>
        </table>
    )
}
