import {TypeCorn} from '../types/types'
import {runInAction} from 'mobx'
import CornStore from '../store/CornStore'
import {useHttp} from '../hooks/http.hook'
import UserStore from '../store/UserStore'

export const MainRequest = () => {
    const {loading, request, error, clearError} = useHttp()
    const {token} = UserStore

    const loadingCorn = async () => {
        try {
            const fetched: TypeCorn[] = await request('api/corn/getList', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            runInAction(() => {
                console.log(fetched)
                CornStore.allCorn = fetched
            })
        } catch (e) {
        }
    }
    return {loadingCorn}
}
