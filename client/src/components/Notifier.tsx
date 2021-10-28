import React, {useContext, useEffect} from 'react'
import StoreContext from '../context/StoreContext'
import {useSnackbar} from 'notistack'
import {observer} from 'mobx-react-lite'
import {autorun} from 'mobx'

export const Notifier = observer(() => {
    const stores = useContext(StoreContext)
    const {enqueueSnackbar} = useSnackbar()
    let displayed: any = []

    const storeDisplayed = (id: any) => {
        displayed = [...displayed, id]
    }

    useEffect(() => {
        autorun(() => {
            const notifications = stores?.userStore.notifications
            notifications.forEach((notification: any) => {
                if (displayed.includes(notification.key)) return
                enqueueSnackbar(notification.message, notifications.options)
                storeDisplayed(notification.key)
                stores?.userStore.removeSnackbar(notification.key)
            })
        })

    }, [stores?.userStore.notifications])
    return null
})