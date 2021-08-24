import React, {useState} from 'react'
import {CornTable} from '../components/CornTable'
import {MainLayout} from '../layouts/MainLayout/MainLayout'
import {AddSale} from '../components/AddSale'
import {SaleTable} from '../components/SaleTable'

export const SalePage = () => {
    const [isShowForm, setIsShowForm] = useState<boolean>(false)
    return(
        <MainLayout>
            <div className="waves-effect waves-light btn" onClick={() => setIsShowForm(!isShowForm)}>Добавить культуру</div>
            {isShowForm && <AddSale/>}
            <SaleTable/>
        </MainLayout>
    )
}
