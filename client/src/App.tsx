import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthContext} from './context/AuthContext'
import {RequestContext} from './context/RequestContext'
import {useAuth} from './hooks/auth.hook.js'
import {Loader} from './components/Loader/Loader'
import {useRoutes} from './routes'
import UserStore from './store/UserStore'
import {useHttp} from './hooks/http.hook'
import {observer} from 'mobx-react'
import {MainRequest} from './request/MainRequests'

const App = observer(() => {
    const {login, logout} = useAuth()
    const {token, ready, userId} = UserStore
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    const {loading, request} = useHttp()
    const {loadingCorn} = MainRequest()
    if (!ready) {
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <RequestContext.Provider value={{loadingCorn}}>
                <Router>
                    {routes}
                </Router>
            </RequestContext.Provider>
        </AuthContext.Provider>
    )
})

export default App
