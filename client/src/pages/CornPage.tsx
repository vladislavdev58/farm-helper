import React, {useState} from 'react'
import {MainLayout} from '../layouts/MainLayout/MainLayout'
import {AddCorn} from '../components/AddCorn'
import {CornTable} from '../components/CornTable'

export const CornPage = () => {
    const [isShowForm, setIsShowForm] = useState<boolean>(false)
    return (
        <MainLayout>
            <div className="waves-effect waves-light btn" onClick={() => setIsShowForm(!isShowForm)}>Добавить культуру</div>
            {isShowForm && <AddCorn/>}
            <CornTable/>
        </MainLayout>
    )
}
