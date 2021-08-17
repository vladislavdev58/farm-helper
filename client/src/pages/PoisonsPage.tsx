import React, {useCallback, useContext, useEffect, useState} from 'react'
import {MainLayout} from '../layouts/MainLayout/MainLayout'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader/Loader'
import {AddPoisons} from '../components/AddPoisons/AddPoisons'
import {PoisonsTable} from '../components/PoisonsTable'
import {TypePoisons} from '../types/types'
import CornStore from '../store/CornStore'
import {observer} from 'mobx-react'
import {runInAction} from 'mobx'


export const PoisonsPage = observer(() => {
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const fetchPoisons = useCallback(async () => {
        try {
            const fetched: TypePoisons[] = await request('api/poisons/getList', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            runInAction(() => {
                CornStore.allPoisons = fetched
            })
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        fetchPoisons()
    }, [fetchPoisons])

    const [isShowForm, setIsShowForm] = useState<boolean>(false)

    if (loading) {
        return <Loader/>
    }
    return (
        <MainLayout>
            <div className="waves-effect waves-light btn" onClick={() => setIsShowForm(!isShowForm)}>Добавить яд</div>
            {isShowForm && <AddPoisons
                fetchPoisons={fetchPoisons}
            />}
            <PoisonsTable/>
        </MainLayout>
    )
})
