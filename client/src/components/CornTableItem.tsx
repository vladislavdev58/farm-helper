import React, {FC} from 'react'
import {EditCorn} from '../modals/EditCorn'

type MyProps = {
    _id: string
    name: string
    weight: number
    cost: number
    index: number
}

export const CornTableItem: FC<MyProps> = ({_id, name, weight, cost, index}) => {

    return (
        <>
            <tr key={_id}>
                <td>{name}</td>
                <td>{weight}</td>
                <td>{cost}</td>
                <td>
                    <EditCorn _id={_id} name={name} weight={weight} cost={cost} id={_id} index={index}/>
                </td>
            </tr>
        </>
    )
}

