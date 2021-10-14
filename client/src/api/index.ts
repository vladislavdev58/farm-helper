import axios from 'axios'

type postType = {
    url: string
}

type loginType = {
    email: string;
    password: string;
}

const post = async (url:string, data:any) => {
    const result = await axios.post(url, data)
    return result.data
}

export const login = async (form:loginType) => {
    const result = await post('/api/auth/login', {...form})
    return result
}

export const register = async (form:loginType) => {
    const result = await post('/api/auth/register', {...form})
    return result
}