import React, {useCallback, useContext, useEffect, useState} from 'react'
import {MainLayout} from '../layouts/MainLayout/MainLayout'
import {AddCorn} from '../components/AddCorn'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader/Loader'
import {CornTable} from '../components/CornTable'
import {TypeCorn} from '../types/types'
import CornStore from '../store/CornStore'
import {observer} from 'mobx-react'
import {runInAction} from 'mobx'

export const CornPage = observer(() => {
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const fetchCorn = useCallback(async () => {
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

    useEffect(() => {
        fetchCorn()
    }, [fetchCorn])

    const [isShowForm, setIsShowForm] = useState<boolean>(false)
    if (loading) {
        return <Loader/>
    }

    return (
        <MainLayout>
            <div className="waves-effect waves-light btn" onClick={() => setIsShowForm(!isShowForm)}>Добавить культуру</div>
            {isShowForm && <AddCorn/>}
            <CornTable/>
        </MainLayout>
    )
})
