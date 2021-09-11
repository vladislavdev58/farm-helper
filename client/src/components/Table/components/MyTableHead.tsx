import React, {FC} from 'react'
import {TableCell, TableHead, TableRow} from '@material-ui/core/'

type MyProps = {
    headData: string[]
}

export const MyTableHead:FC<MyProps> = ({headData}) => {
    return (
        <TableHead>
            <TableRow>
                {
                    headData.map((text, index) =>
                        <TableCell key={index}>{text}</TableCell>
                    )
                }
            </TableRow>
        </TableHead>
    )
}
