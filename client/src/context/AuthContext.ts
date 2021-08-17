import {createContext} from 'react'

function noop() {}

type TypeContext = {
    token: null | string
    userId: null | string
    login: (jwtToken: string, id: string) => void
    logout: () => void
    isAuthenticated: boolean
}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
} as TypeContext)
