import React, {FC, useState} from 'react'
import {EditCorn} from './EditCorn'

type MyProps = {
    _id: string
    name: string
    weight: number
    cost: number
}

export const CornTableItem: FC<MyProps> = ({_id, name, weight, cost}) => {
    const [isShowForm, setIsShowForm] = useState<boolean>(false)
    return (
        <>
            <tr key={_id}>
                <td>{name}</td>
                <td>{weight}</td>
                <td>{cost}</td>
                <td onClick={() => setIsShowForm(!isShowForm)}><i className="material-icons">edit</i></td>
                {isShowForm && <EditCorn _id={_id} name={name} weight={weight} cost={cost}/>}
            </tr>
        </>
    )
}

