import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import RootStore from './store/RootStore'
import StoreContext from './context/StoreContext'
import {Routes} from './Routes'

const rootStore = new RootStore()

const App = observer(() => {
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
