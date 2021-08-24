import React, {FC, useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'

type MyProps = {
    isShow: boolean,
    setIsShow: (value: boolean) => void
}
export const Header: FC<MyProps> = ({isShow, setIsShow}) => {
    const styleMenu = {
        cursor: 'pointer',
        fontSize: 32
    }
    const auth = useContext(AuthContext)
    return (
        <div>
            <nav className='light-blue lighten-5 black-text'>
                <div className="nav-wrapper">
                    <ul className="left hide-on-med-and-down">
                        <li><span onClick={() => setIsShow(!isShow)}><i className="material-icons"
                                                                        style={styleMenu}>menu</i></span></li>
                    </ul>
                    <ul className='right hide-on-med-and-down'>
                        <li>
                            <a href='#!' className='black-text' onClick={() => auth.logout()}>Выйти</a>
                        </li>
                        <li>
                            <Link className='black-text' to='/add-corn'>Зерно</Link>
                        </li>
                        <li>
                            <Link className='black-text' to='/poisons'>Яды</Link>
                        </li>
                        <li>
                            <Link className='black-text' to='/add-sale'>Продажи</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>


    )
}
