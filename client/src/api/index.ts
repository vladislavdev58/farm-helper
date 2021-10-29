type postType = {
    url: string
}

type loginType = {
    email: string;
    password: string;
}

const post = async (url: string, data: any) => {
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()

    if (!response.ok) {
        throw new Error(result.message || 'Что-то пошло не так')
    }
    return result
}

export const login = async (form: loginType) => await post('/api/auth/login', form)

export const register = async (form: loginType) => await post('/api/auth/register', form)

export const loadingCorn = async () => await get