import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {DashboardPage} from './pages/DashboardPage'
import {AuthPage} from './pages/AuthPage'
import {PoisonsPage} from './pages/PoisonsPage'
import {CornPage} from './pages/CornPage'
import {SalePage} from './pages/SalePage'

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route exact path={'/'} component={DashboardPage}/>
                <Route exact path={'/poisons'} component={PoisonsPage}/>
                <Route exact path={'/add-corn'} component={CornPage}/>
                <Route exact path={'/add-sale'} component={SalePage}/>
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
}
