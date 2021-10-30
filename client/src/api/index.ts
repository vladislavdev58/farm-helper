type loginType = {
    email: string;
    password: string;
}

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

export const login = (form: loginType) => request('POST', '/api/auth/login', form)

export const register = (form: loginType) => request('POST', '/api/auth/register', form)

export const loadCorn = () => request('GET', '/api/tables/corn')

export const addCorn = (form:any) => request('PUT', '/api/tables/corn', form)

export const loadPoisons = () => request('GET', '/api/tables/poisons')

export const addPoisons = (form: any) => request('PUT', '/api/tables/poisons', form)

export const loadSale = () => request('GET', '/api/tables/sale')

export const addSale = (form: any) => request('PUT', '/api/tables/sale', form)