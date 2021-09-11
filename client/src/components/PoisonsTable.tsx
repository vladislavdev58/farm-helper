import React from 'react'
import CornStore from '../store/CornStore'
import {observer} from 'mobx-react'
import {runInAction, toJS} from 'mobx'
import {TableCell, TableRow} from '@material-ui/core'
import {MyTable} from './Table/MyTable'


export const PoisonsTable = observer(() => {
    // FIXME подумать над дублированием и убрать any
    const sortBy = (name: string) => {
        runInAction(() => {
            CornStore.allPoisons.sort((a: any, b: any) => a[name] < b[name] ? 1 : -1)
        })
    }
    const sortByName = () => {
        console.log(toJS(CornStore.allPoisons))
        runInAction(() => {
            CornStore.allPoisons.sort((a: any, b: any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        })
    }
    if (!CornStore.allPoisons.length) {
        return (
            <p>Пусто</p>
        )
    }
    return (
        <MyTable
            headData={['Название', 'Объем(кг)', 'Цена(руб)', 'Стоимость(кг/р)', 'Дата']}
        >
            {CornStore.allPoisons.map((item) => (
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
