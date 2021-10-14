import React, {useEffect} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import RootStore from './store/RootStore'
import StoreContext from './context/StoreContext'
import {Routes} from './Routes'

const rootStore = new RootStore()

type localStorageType = {
    token: string
    userId: string
}


const App = observer(() => {


    const checkAuth = () => {
        const storage: string | null = localStorage.getItem('userData')
        if (!storage) {
            return
        }
        const storageObj: localStorageType = JSON.parse(storage)
        const {token, userId} = storageObj
        rootStore.userStore.token = token
        rootStore.userStore.userId = userId
    }

    useEffect(() => {
        checkAuth()
    }, [])
    return (
        <StoreContext.Provider
            value={{
                rootStore: rootStore,
                userStore: rootStore.userStore,
                cornStore: rootStore.cornStore
            }}
        >
            <Router>
                <Routes/>
            </Router>
        </StoreContext.Provider>
    )
})

export default App
