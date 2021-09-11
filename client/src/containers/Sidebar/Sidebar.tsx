import React, {FC} from 'react'
import {Drawer} from '@material-ui/core'
import {Header} from './components/Header'
import {MenuList} from './components/MenuList'

type MyProps = {
    openSidebar: boolean
    setOpenSidebar: (x: boolean) => void
}


export const Sidebar: FC<MyProps> = ({openSidebar, setOpenSidebar}) => {

    const setState = (state: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        setOpenSidebar(state)
    }

    return (
        <Drawer open={openSidebar} onClose={setState(false)}>
            <Header/>
            <MenuList/>
        </Drawer>
    )
}
