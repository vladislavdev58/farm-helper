import {makeAutoObservable} from 'mobx'

class CornStore {

    token: string | null = null
    userId: string | null = null
    ready: boolean = false
    notifications: any = []

    constructor() {
        makeAutoObservable(this)
    }

    enqueueSnackbar = (message: string = 'Тут должно быть что-то важное', variant: string = 'info') => {
        const note = {
            message,
            options: {
                variant
            },
        }
        this.notifications.push({
            key: new Date().getTime() + Math.random(),
            ...note,
        })
    }

    removeSnackbar = (key: number) => {
        this.notifications = this.notifications.filter((notification: any) => notification.key !== key)
    }
}


export default CornStore
