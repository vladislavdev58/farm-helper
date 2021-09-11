import React from 'react'
import CornStore from '../store/CornStore'
import {observer} from 'mobx-react'
import {runInAction} from 'mobx'
import {TableCell, TableRow} from '@material-ui/core'
import {MyTable} from './Table/MyTable'

export const CornTable = observer(() => {
    const sortBy = (name: string) => {
        console.log(name)
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
        <MyTable
            headData={['Название','Объем','Стоимость']}
        >
            {CornStore.allCorn.map((item, index) => (
                <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                    <TableCell>{item.cost}</TableCell>
                </TableRow>
            ))}
        </MyTable>
    )
})
