import React, {FC} from 'react'
import {Header} from '../../containers/Header/Header'

export const MainLayout: FC = ({children}) => {
    return (
        <div>
            <Header/>
            <div className='container'>
                {children}
            </div>
        </div>

    )
}
