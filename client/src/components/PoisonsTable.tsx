import React, {useContext} from 'react'
import CornStore from '../store/CornStore'
import {observer} from 'mobx-react-lite'
import {runInAction, toJS} from 'mobx'
import {TableCell, TableRow} from '@material-ui/core'
import {MyTable} from './Table/MyTable'
import StoreContext from '../context/StoreContext'


export const PoisonsTable = observer(() => {
    const stores = useContext(StoreContext)
    // FIXME подумать над дублированием и убрать any
    const sortBy = (name: string) => {
        runInAction(() => {
            stores?.cornStore.allPoisons.sort((a: any, b: any) => a[name] < b[name] ? 1 : -1)
        })
    }
    const sortByName = () => {
        runInAction(() => {
            stores?.cornStore.allPoisons.sort((a: any, b: any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        })
    }
    if (!stores?.cornStore.allPoisons.length) {
        return (
            <p>Пусто</p>
        )
    }
    return (
        <MyTable
            headData={['Название', 'Объем(кг)', 'Цена(руб)', 'Стоимость(кг/р)', 'Дата']}
        >
            {stores?.cornStore.allPoisons.map((item) => (
                <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                    <TableCell>{item.cost}</TableCell>
                    <TableCell>{item.sum}</TableCell>
                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                </TableRow>
            ))}
        </MyTable>
    )
})
