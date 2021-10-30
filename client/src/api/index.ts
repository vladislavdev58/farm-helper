import {TypeAuthData} from '../types/auth'
import {TypeSaleForm} from '../types/sale'
import {TypePoisonsForm} from '../types/poisons'
import {TypeCornForm} from '../types/corn'

type initLogin = {
    method: string
    headers: {
        'Content-Type': string
        Authorization?: string
    }
    body?: string
}

const request = async (method: 'POST' | 'PUT' | 'GET', url: string, data: any = {}) => {
    const userData = localStorage.getItem('userData')
    // FIXME азобраться как лучше сюда таскать токен
    let token = null
    if (userData) {
        const userDataObj = JSON.parse(userData)
        token = userDataObj.token
    }
    const init:initLogin = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    if (method !== 'GET') {
        init.body = JSON.stringify(data)
    }
    const response = await fetch(url, init)
    const result = await response.json()

    if (!response.ok) {
        throw new Error(result.message || 'Что-то пошло не так')
    }
    return result
}

export const login = (form: TypeAuthData) => request('POST', '/api/auth/login', form)

export const register = (form: TypeAuthData) => request('POST', '/api/auth/register', form)

export const loadCorn = () => request('GET', '/api/tables/corn')

export const addCorn = (form:TypeCornForm) => request('PUT', '/api/tables/corn', form)

export const loadPoisons = () => request('GET', '/api/tables/poisons')

export const addPoisons = (form: TypePoisonsForm) => request('PUT', '/api/tables/poisons', form)

export const loadSale = () => request('GET', '/api/tables/sale')

export const addSale = (form: TypeSaleForm) => request('PUT', '/api/tables/sale', form)