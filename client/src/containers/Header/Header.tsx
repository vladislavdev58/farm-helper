import React, {FC} from 'react'
import {Link} from 'react-router-dom'

type MyProps = {
    isShow: boolean,
    setIsShow: (value: boolean) => void
}
export const Header:FC<MyProps> = ({isShow, setIsShow}) => {
    const styleMenu = {
        cursor: 'pointer',
        fontSize: 32
    }
    return (
        <div>
            <nav className='light-blue lighten-5 black-text'>
                <div className="nav-wrapper">
                    <ul className="left hide-on-med-and-down">
                        <li><span onClick={() => setIsShow(!isShow)}><i className="material-icons" style={styleMenu}>menu</i></span></li>
                    </ul>
                    <ul className='right hide-on-med-and-down'>
                        <li>
                            <Link className='black-text' to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link className='black-text' to='/add-corn'>Зерно</Link>
                        </li>
                        <li>
                            <Link className='black-text' to='/poisons'>Яды</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>


    )
}
