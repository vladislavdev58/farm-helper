import React, {FC, useState} from 'react'
import style from './MainLayout.module.scss'
import {Sidebar} from '../../containers/Sidebar/Sidebar'
import {Header} from '../../containers/Header/Header'

type TypeChildren = {
    children: React.ReactNode
}
export const MainLayout: FC<TypeChildren> = ({children}) => {
    const [isShow, setIsShow] = useState<boolean>(true)
    const classes = [style.wrapper, isShow ? '' : style.close]
    return (
        <div className={classes.join(' ')}>
            <Sidebar
                isShow={isShow}
            />
            <div>
                <Header
                    isShow={isShow}
                    setIsShow={setIsShow}
                />
                <div className='container'>
                    {children}
                </div>
            </div>

        </div>
    )
}
