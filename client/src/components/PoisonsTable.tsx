import React from 'react'
import CornStore from '../store/CornStore'
import {observer} from 'mobx-react'
import {runInAction, toJS} from 'mobx'


export const PoisonsTable = observer(() => {
    // FIXME подумать над дублированием и убрать any
    const sortBy = (name: string) => {
        runInAction(() => {
            CornStore.allPoisons.sort((a:any, b:any) => a[name] < b[name] ? 1 : -1)
        })
    }
    const sortByName = () => {
        console.log(toJS(CornStore.allPoisons))
        runInAction(() => {
            CornStore.allPoisons.sort((a:any,b:any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        })
    }
    if (!CornStore.allPoisons.length) {
        return (
            <p>Пусто</p>
        )
    }
    return (
        <table>
            <thead>
            <tr>
                <th onClick={sortByName}>Название</th>
                <th onClick={() => sortBy('weight')}>Объем(кг)</th>
                <th onClick={() => sortBy('cost')}>Цена(руб)</th>
                <th onClick={() => sortBy('sum')}>Стоимость(кг/р)</th>
                <th onClick={() => sortBy('date')}>Дата</th>
            </tr>
            </thead>

            <tbody>
            {
                CornStore.allPoisons.map((item, index) => {
                    return (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.weight}</td>
                            <td>{item.cost}</td>
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
