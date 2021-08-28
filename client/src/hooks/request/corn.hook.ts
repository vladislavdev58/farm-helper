import {useHttp} from "../http.hook";
import {useCallback} from "react";
import {TypeCorn} from "../../types/types";
import {runInAction} from "mobx";
import CornStore from "../../store/CornStore";
import {useAuth} from "../auth.hook.js";
import {observer} from "mobx-react";

export const useHttpCorn = () => {
    const {loading, request} = useHttp()
    const {token} = useAuth()
    const loadingCorn = loading
    const fetchCorn:any = useCallback(async () => {
        try {
            const fetched: TypeCorn[] = await request('api/corn/getList', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            runInAction(() => {
                CornStore.allCorn = fetched
            })
        } catch (e) {
        }
    }, [token, request])

    return {fetchCorn, loadingCorn}
}