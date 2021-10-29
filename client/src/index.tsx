import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {SnackbarProvider} from 'notistack'
import StoreContext from './context/StoreContext'
import RootStore from './store/RootStore'

const rootStore = new RootStore()
ReactDOM.render(
    // <React.StrictMode>
    <StoreContext.Provider
        value={{
            rootStore: rootStore,
            userStore: rootStore.userStore,
            cornStore: rootStore.cornStore
        }}
    >
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            iconVariant={{
                success: '✅',
                error: '✖️',
                warning: '⚠️',
                info: 'ℹ️',
            }}
        >
            <App/>
        </SnackbarProvider>
    </StoreContext.Provider>,
    // </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
