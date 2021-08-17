import React from 'react'
import logo from '../../assets/images/logo.png'
import style from './Logo.module.scss'
import {Link} from 'react-router-dom'

export const Logo = () => {
    const title = 'КФХ Кузьмин'
    return (
        <div className={style.wrapper}>
            <Link to={'/'}>
                <img src={logo} alt={title} className={style.logo}/>
            </Link>
            <span className={style.title}>{title}</span>
        </div>
    )
}
