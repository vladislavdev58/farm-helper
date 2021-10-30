import React, {useContext} from 'react'
import {observer} from 'mobx-react-lite'
import {runInAction} from 'mobx'
import {TableCell, TableRow} from '@material-ui/core'
import {MyTable} from '../../../components/Table/MyTable'
import StoreContext from '../../../context/StoreContext'

export const CornTable = observer(() => {
    const stores = useContext(StoreContext)
    const sortBy = (name: string) => {
        runInAction(() => {
            stores?.cornStore.allCorn.sort((a: any, b: any) => a[name] < b[name] ? 1 : -1)
        })
    }
    const sortByName = () => {
        runInAction(() => {
            stores?.cornStore.allCorn.sort((a: any, b: any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        })
    }
    if (!stores?.cornStore.allCorn.length) {
        return <p>Пусто</p>
    }
    return (
        <MyTable
            headData={['Название','Объем','Стоимость']}
        >
            {stores?.cornStore.allCorn.map((item, index) => (
                <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                    <TableCell>{item.cost}</TableCell>
                </TableRow>
            ))}
        </MyTable>
    )
})
