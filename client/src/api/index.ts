type postType = {
    url: string
}

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

const request = async (method: string, url: string, data: any = {}) => {
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
    if (method === 'post') {
        init.body = JSON.stringify(data)
    }
    const response = await fetch(url, init)
    const result = await response.json()

    if (!response.ok) {
        throw new Error(result.message || 'Что-то пошло не так')
    }
    return result
}

export const login = async (form: loginType) => await request('post', '/api/auth/login', form)

export const register = async (form: loginType) => await request('post', '/api/auth/register', form)

export const loadingCorn = async () => await request('get', '/api/tables/corn')