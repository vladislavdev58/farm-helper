import React, {FC, useContext} from 'react'
import {EditCorn} from '../modals/EditCorn'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useMessage} from '../hooks/message.hook'
import CornStore from '../store/CornStore'

type MyProps = {
    _id: string
    name: string
    weight: number
    cost: number
    index: number
}

export const CornTableItem: FC<MyProps> = ({_id, name, weight, cost, index}) => {
    const showMessage = useMessage()
    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()
    const deleteHandler = async () => {
        try {
            const result = window.confirm(`Вы уверены что хотите удалить ${name} ?`)
            if (!result) {
                return showMessage(`${name} - не удален`)
            }
            const data = await request('/api/corn/delete', 'DELETE', {_id, name}, {
                Authorization: `Bearer: ${auth.token}`
            })
            CornStore.allCorn.splice(index, 1);
            const {message} = data
            showMessage(message)
        } catch (e) {

        }
    }
    return (
        <>
            <tr key={_id}>
                <td>{name}</td>
                <td>{weight}</td>
                <td>{cost}</td>
                <td>
                    <EditCorn _id={_id} name={name} weight={weight} cost={cost} id={_id} index={index}/>
                </td>
                <td><i onClick={deleteHandler} className="material-icons">clear</i></td>
            </tr>
        </>
    )
}

