import {makeAutoObservable} from 'mobx'
import {TypeNotification} from '../types/types'

class CornStore {

    token: string | null = null
    userId: string | null = null
    ready: boolean = false
    notifications: TypeNotification[] = []

    constructor() {
        makeAutoObservable(this)
    }

    enqueueSnackbar = (message: string = 'Тут должно быть что-то важное', variant: 'success' | 'error' | 'warning' | 'info' = 'info') => {
        const note: TypeNotification = {
            key: new Date().getTime() + Math.random(),
            message,
            options: {
                variant
            },
        }
        this.notifications.push(note)
    }

    removeSnackbar = (key: number) => {
        this.notifications = this.notifications.filter((notification: TypeNotification) => notification.key !== key)
    }
}


export default CornStore
