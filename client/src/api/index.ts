import axios from 'axios'

type loginType = {
    email: string;
    password: string;
}

export const login = async (form:loginType) => {
    const data = await axios.post('/api/auth/login', {...form})
    return data
    console.log(data)
}
