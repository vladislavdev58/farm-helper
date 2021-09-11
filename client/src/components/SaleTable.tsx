import React from 'react'
import CornStore from '../store/CornStore'
import {observer} from 'mobx-react'
import {TableCell, TableRow} from '@material-ui/core'
import {MyTable} from './Table/MyTable'

export const SaleTable = observer(() => {
    return(
        <MyTable
            headData={['Название','Объем','Сумма', 'Дата']}
        >
            {CornStore.allSale.map((item) => (
                <TableRow key={item._id}>
                    <TableCell component="th" scope="row">
                        {item.name}
                    </TableCell>
                    <TableCell>{item.weight}</TableCell>
                    <TableCell>{item.sum}</TableCell>
                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                </TableRow>
            ))}
        </MyTable>
    )
})
