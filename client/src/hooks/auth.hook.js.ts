import {useCallback, useEffect, useState} from 'react'

const storageName: string = 'userData'

type StorageType = {
    userId: string | null
    token: string | null
}

export const useAuth = () => {
    const [token, setToken] = useState<null | string>(null)
    const [ready, setReady] = useState<boolean>(false)
    const [userId, setUserId] = useState<null | string>(null)

    const login = useCallback((jwtToken: string, id: string) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        } as StorageType))
    }, [])
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const local = localStorage.getItem(storageName) || '{}'
        const data = JSON.parse(local)
        if (data && data.token) {
            const data = JSON.parse(local)
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, userId, ready}
}
