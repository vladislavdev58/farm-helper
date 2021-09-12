import {useCallback, useEffect} from 'react'
import UserStore from '../store/UserStore'

const storageName: string = 'userData'

type StorageType = {
    userId: string | null
    token: string | null
}

export const useAuth = () => {

    const login = useCallback((jwtToken: string, id: string) => {
        UserStore.token = jwtToken
        UserStore.userId = id
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        } as StorageType))
    }, [])
    const logout = useCallback(() => {
        UserStore.token = null
        UserStore.userId = null
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const local = localStorage.getItem(storageName) || '{}'
        const data = JSON.parse(local)
        if (data && data.token) {
            const data = JSON.parse(local)
            login(data.token, data.userId)
        }
        UserStore.ready = true
    }, [login])

    return {login, logout}
}
