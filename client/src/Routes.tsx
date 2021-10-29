import React, {useContext} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {DashboardPage} from './pages/DashboardPage'
import {AuthPage} from './pages/AuthPage/AuthPage'
import {PoisonsPage} from './pages/PoisonsPage'
import {CornPage} from './pages/CornPage'
import {SalePage} from './pages/SalePage'
import StoreContext from './context/StoreContext'
import {observer} from 'mobx-react-lite'

export const Routes = observer(() => {
    const stores = useContext(StoreContext)
    if (!!stores?.userStore.token) {
        return (
            <Switch>
                <Route exact path={'/'} component={DashboardPage}/>
                <Route exact path={'/poisons'} component={PoisonsPage}/>
                <Route exact path={'/corn'} component={CornPage}/>
                <Route exact path={'/sale'} component={SalePage}/>
                <Redirect to='/'/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route exact path={'/login'} component={AuthPage}/>
            <Redirect to='/login'/>
        </Switch>
    )
})
