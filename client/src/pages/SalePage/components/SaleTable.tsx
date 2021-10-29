import React, {useContext} from 'react'
import {observer} from 'mobx-react-lite'
import {TableCell, TableRow} from '@material-ui/core'
import {MyTable} from '../../../components/Table/MyTable'
import StoreContext from '../../../context/StoreContext'

export const SaleTable = observer(() => {
    const stores = useContext(StoreContext)
    return(
        <MyTable
            headData={['Название','Объем','Сумма', 'Дата']}
        >
            {stores?.cornStore.allSale.map((item) => (
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
