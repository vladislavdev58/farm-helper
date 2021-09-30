import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {SnackbarProvider} from 'notistack'

ReactDOM.render(
    // <React.StrictMode>
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
    </SnackbarProvider>,
    // </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
