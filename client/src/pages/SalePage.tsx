import React, {useCallback, useContext, useEffect, useState} from 'react'
import {MainLayout} from '../layouts/MainLayout/MainLayout'
import {AddSale} from '../components/AddSale'
import {SaleTable} from '../components/SaleTable'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {TypeSale} from "../types/types";
import {runInAction} from "mobx";
import CornStore from "../store/CornStore";
import {Loader} from "../components/Loader/Loader";
import {observer} from "mobx-react";

export const SalePage = observer(() => {
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const fetchSale = useCallback(async () => {
        try {
            const fetched: TypeSale[] = await request('api/sale/get', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(fetched)
            runInAction(() => {
                CornStore.allSale = fetched
            })
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        fetchSale()
    }, [fetchSale])
    const [isShowForm, setIsShowForm] = useState<boolean>(false)
    if (loading) return <Loader/>
    return(
        <MainLayout>
            <div className="waves-effect waves-light btn" onClick={() => setIsShowForm(!isShowForm)}>Добавить культуру</div>
            {isShowForm && <AddSale/>}
            <SaleTable/>
        </MainLayout>
    )
})
