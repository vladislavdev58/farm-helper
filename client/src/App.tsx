import React, {useContext, useEffect} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import {Routes} from './Routes'
import StoreContext from './context/StoreContext'
import {Notifier} from './components/Notifier'
import {toJS} from 'mobx'

type localStorageType = {
    token: string
    userId: string
}


const App = observer(() => {
    const stores = useContext(StoreContext)
    const checkAuth = () => {
        const storage: string | null = localStorage.getItem('userData')
        if (!storage) {
            return
        }
        const storageObj: localStorageType = JSON.parse(storage)
        const {token, userId} = storageObj
        if (stores) {
            stores.userStore.token = token
            stores.userStore.userId = userId
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])
    return (
        <>
            <Notifier/>
            <Router>
                <Routes/>
            </Router>
        </>
    )
})

export default App
