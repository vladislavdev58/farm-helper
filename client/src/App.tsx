import React, {useEffect} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook.js";
import {Loader} from './components/Loader/Loader'
import {useRoutes} from './routes'
import {useHttpCorn} from "./hooks/request/corn.hook";

const App = () => {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    const {fetchCorn} = useHttpCorn()
    useEffect(() => {
        if (ready) {
            fetchCorn()
        }
    }, [ready, fetchCorn])
    //END Corn
    if (!ready) {
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Router>
                {routes}
            </Router>
        </AuthContext.Provider>
    )
}

export default App
