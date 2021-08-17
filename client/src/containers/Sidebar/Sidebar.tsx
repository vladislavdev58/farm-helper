import React, {FC} from 'react'
import style from './Sidebar.module.scss'
import {Logo} from '../../components/Logo/Logo'

type MyProps = {
    isShow: boolean
}

export const Sidebar:FC<MyProps> = ({isShow}) => {
    const classes = [style.wrapper, isShow ? '' : style.close]
    return (
        <div className={`${classes.join(' ')} light-blue lighten-5`}>
            <Logo/>
        </div>
    )
}
