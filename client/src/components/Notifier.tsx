import {useContext, useEffect} from 'react'
import StoreContext from '../context/StoreContext'
import {useSnackbar} from 'notistack'
import {observer} from 'mobx-react-lite'
import {autorun} from 'mobx'
import {TypeNotification} from '../types/types'

export const Notifier = observer(() => {
    const stores = useContext(StoreContext)
    const {enqueueSnackbar} = useSnackbar()
    let displayed: number[] = []

    const storeDisplayed = (id: number) => {
        displayed = [...displayed, id]
    }

    useEffect(() => {
        autorun(() => {
            if (stores?.userStore) {
                const notifications: TypeNotification[] = stores.userStore.notifications
                notifications.forEach((notification: TypeNotification) => {
                    if (displayed.includes(notification.key)) return
                    enqueueSnackbar(notification.message, notification.options)
                    storeDisplayed(notification.key)
                    stores.userStore.removeSnackbar(notification.key)
                })
            }
        })

    }, [stores?.userStore.notifications])
    return null
})