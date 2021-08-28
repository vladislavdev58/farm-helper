import React, {useCallback, useEffect} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook.js";
import {Loader} from './components/Loader/Loader'
import {useRoutes} from './routes'
import {TypeCorn} from "./types/types";
import {runInAction} from "mobx";
import CornStore from "./store/CornStore";
import {useHttp} from "./hooks/http.hook";

const App = () => {
    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    //Corn
    const {loading, request} = useHttp()
    const fetchCorn = useCallback(async () => {
        try {
            const fetched: TypeCorn[] = await request('api/corn/getList', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            runInAction(() => {
                CornStore.allCorn = fetched
            })
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        fetchCorn()
    }, [fetchCorn])
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
