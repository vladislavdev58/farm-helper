import React, {FC} from 'react'
import {MyTableHead} from './components/MyTableHead'
import {Paper, Table, TableBody, TableContainer} from '@material-ui/core'

type MyProps = {
    headData: string[]
}

export const MyTable: FC<MyProps> = ({headData, children}) => {
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <MyTableHead
                    headData={headData}
                />
                <TableBody>
                    {children}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
