import {createContext} from 'react'

function noop() {}

type TypeContext = {
    loadingCorn: () => void
}
export const RequestContext = createContext({
    loadingCorn: noop,
    loading: null
} as TypeContext)
