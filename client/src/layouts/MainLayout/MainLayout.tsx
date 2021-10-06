import React, {FC} from 'react'
import {Header} from '../../containers/Header/Header'
import {Container} from '@material-ui/core'

export const MainLayout: FC = ({children}) => {
    return (
        <>
            <Header/>
            <Container maxWidth="xl">
                <>
                    {children}
                </>
            </Container>
        </>

    )
}
